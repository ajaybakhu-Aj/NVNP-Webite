from cms_core.services.field_validator import validate_payload


def test_validate_text_and_required():
    definitions = [
        {
            'key': 'title',
            'field_type': 'TEXT',
            'name': 'Title',
            'validation_rules': {'required': True, 'max_length': 10}
        }
    ]

    # 1. Valid
    is_valid, errors = validate_payload({'title': 'Short'}, definitions)
    assert is_valid
    assert not errors

    # 2. Missing required
    is_valid, errors = validate_payload({}, definitions)
    assert not is_valid
    assert 'title' in errors
    assert errors['title'] == ['Title is required.']

    # 3. Exceeds max length
    is_valid, errors = validate_payload({'title': 'This is way too long'}, definitions)
    assert not is_valid
    assert 'title' in errors
    assert errors['title'] == ['Title cannot exceed 10 characters.']

    # 4. Wrong type
    is_valid, errors = validate_payload({'title': 123}, definitions)
    assert not is_valid
    assert errors['title'] == ['Title must be a string.']


def test_validate_select():
    definitions = [
        {
            'key': 'color',
            'field_type': 'SELECT',
            'name': 'Color',
            'validation_rules': {'choices': ['red', 'blue', 'green']}
        }
    ]

    # 1. Valid
    is_valid, errors = validate_payload({'color': 'blue'}, definitions)
    assert is_valid

    # 2. Invalid choice
    is_valid, errors = validate_payload({'color': 'yellow'}, definitions)
    assert not is_valid
    assert errors['color'] == ["'yellow' is not a valid choice for Color."]


def test_validate_repeater_and_nested_repeater():
    definitions = [
        {
            'key': 'features',
            'field_type': 'REPEATER',
            'name': 'Features',
            'validation_rules': {
                'min_items': 1,
                'max_items': 2,
                'sub_fields': [
                    {
                        'key': 'feature_title',
                        'field_type': 'TEXT',
                        'name': 'Feature Title',
                        'validation_rules': {'required': True}
                    },
                    {
                        'key': 'sub_features',
                        'field_type': 'NESTED_REPEATER',
                        'name': 'Sub Features',
                        'validation_rules': {
                            'sub_fields': [
                                {
                                    'key': 'sub_title',
                                    'field_type': 'TEXT',
                                    'name': 'Sub Title',
                                    'validation_rules': {'required': True}
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]

    # 1. Valid complex payload
    payload = {
        'features': [
            {
                'feature_title': 'Feature 1',
                'sub_features': [
                    {'sub_title': 'Sub 1.1'}
                ]
            }
        ]
    }
    is_valid, errors = validate_payload(payload, definitions)
    assert is_valid

    # 2. Missing required in sub field
    payload_missing_sub = {
        'features': [
            {
                'feature_title': 'Feature 1',
                'sub_features': [
                    {} # Missing sub_title
                ]
            }
        ]
    }
    is_valid, errors = validate_payload(payload_missing_sub, definitions)
    assert not is_valid
    assert 0 in errors['features']
    assert 'sub_features' in errors['features'][0]
    assert 0 in errors['features'][0]['sub_features']
    assert 'sub_title' in errors['features'][0]['sub_features'][0]
    assert errors['features'][0]['sub_features'][0]['sub_title'] == ['Sub Title is required.']

    # 3. Exceeds max items
    payload_max_items = {
        'features': [
            {'feature_title': 'F1'},
            {'feature_title': 'F2'},
            {'feature_title': 'F3'},
        ]
    }
    is_valid, errors = validate_payload(payload_max_items, definitions)
    assert not is_valid
    assert errors['features'] == ['Features allows at most 2 items.']
