def validate_payload(payload: dict, definitions: list) -> tuple[bool, dict]:
    """
    Strictly validates a dynamic JSON payload against a list of field definitions.
    
    :param payload: dict (e.g. {"header_text": "Hello", "features": [{"title": "A"}]})
    :param definitions: list of dicts containing `key`, `field_type`, `validation_rules`, and `name`.
                        Can also be a list of CustomFieldDefinition objects.
    :return: (is_valid: bool, errors: dict)
    """
    errors = {}

    # Normalize definitions to dicts if they are model instances
    norm_defs = []
    for d in definitions:
        if hasattr(d, 'key'):
            norm_defs.append({
                'key': d.key,
                'field_type': d.field_type,
                'validation_rules': d.validation_rules,
                'name': d.name
            })
        else:
            norm_defs.append(d)

    for field_def in norm_defs:
        key = field_def['key']
        field_type = field_def['field_type']
        rules = field_def.get('validation_rules', {})
        name = field_def.get('name', key)
        
        is_required = rules.get('required', False)
        value = payload.get(key)

        # 1. Check Required
        if is_required and (value is None or value == "" or value == []):
            errors[key] = [f"{name} is required."]
            continue

        # If not required and no value, skip further validation
        if value is None or value == "" or value == []:
            continue

        # 2. Type and Rule Validation
        field_errors = []
        if field_type in ['TEXT', 'RICHTEXT']:
            if not isinstance(value, str):
                field_errors.append(f"{name} must be a string.")
            else:
                max_length = rules.get('max_length')
                if max_length and len(value) > max_length:
                    field_errors.append(f"{name} cannot exceed {max_length} characters.")

        elif field_type == 'SELECT':
            choices = rules.get('choices', [])
            if value not in choices:
                field_errors.append(f"'{value}' is not a valid choice for {name}.")

        elif field_type == 'RELATION':
            if not isinstance(value, (int, str)) and not (isinstance(value, list) and all(isinstance(v, (int, str)) for v in value)):
                 field_errors.append(f"{name} must be an ID or list of IDs.")

        elif field_type in ['REPEATER', 'NESTED_REPEATER']:
            if not isinstance(value, list):
                field_errors.append(f"{name} must be a list of items.")
            else:
                sub_fields = rules.get('sub_fields', [])
                min_items = rules.get('min_items')
                max_items = rules.get('max_items')

                if min_items is not None and len(value) < min_items:
                    field_errors.append(f"{name} requires at least {min_items} items.")
                if max_items is not None and len(value) > max_items:
                    field_errors.append(f"{name} allows at most {max_items} items.")

                repeater_errors = {}
                for i, item in enumerate(value):
                    if not isinstance(item, dict):
                        repeater_errors[i] = {"__all__": ["Item must be an object."]}
                        continue
                    
                    is_item_valid, item_errors = validate_payload(item, sub_fields)
                    if not is_item_valid:
                        repeater_errors[i] = item_errors

                if repeater_errors:
                    # Assign dict of errors directly for repeater
                    errors[key] = repeater_errors
                    continue # We don't append to field_errors to keep the nested structure

        if field_errors:
            errors[key] = field_errors

    is_valid = len(errors) == 0
    return is_valid, errors
