class FormLogicEvaluator:
    """
    Evaluates conditional logic rules against a submitted form payload.
    Used to sanitize data for conditionally hidden fields.
    """

    def __init__(self, fields_schema, data):
        """
        :param fields_schema: List of field definitions containing `name` and optional `conditional_logic`.
        :param data: The submitted dictionary of data.
        """
        self.fields_schema = fields_schema
        self.data = data

    def evaluate_condition(self, condition):
        """
        Evaluates a single condition like: {"field": "age", "operator": "greater_than", "value": 18}
        """
        field_name = condition.get("field")
        operator = condition.get("operator")
        target_value = condition.get("value")

        actual_value = self.data.get(field_name)

        if actual_value is None:
            return False

        if operator == "equals":
            return str(actual_value) == str(target_value)
        elif operator == "not_equals":
            return str(actual_value) != str(target_value)
        elif operator == "contains":
            return str(target_value).lower() in str(actual_value).lower()
        elif operator == "greater_than":
            try:
                return float(actual_value) > float(target_value)
            except (ValueError, TypeError):
                return False
        elif operator == "less_than":
            try:
                return float(actual_value) < float(target_value)
            except (ValueError, TypeError):
                return False

        return False

    def is_field_visible(self, field_def):
        """
        Checks if a given field definition should be visible based on its conditional logic.
        Expected structure:
        "conditional_logic": {
            "action": "show", # or "hide"
            "match": "all", # or "any"
            "rules": [
                {"field": "is_company", "operator": "equals", "value": "Yes"}
            ]
        }
        """
        logic = field_def.get("conditional_logic")
        if not logic:
            return True  # Visible by default

        action = logic.get("action", "show")
        match = logic.get("match", "all")
        rules = logic.get("rules", [])

        if not rules:
            return True

        results = [self.evaluate_condition(rule) for rule in rules]

        if match == "any":
            condition_met = any(results)
        else:
            condition_met = all(results)

        if action == "show":
            return condition_met
        else:  # action == "hide"
            return not condition_met

    def get_sanitized_data(self):
        """
        Returns the data dictionary with conditionally hidden fields removed.
        """
        sanitized = {}
        for field_def in self.fields_schema:
            field_name = field_def.get("name")
            if not field_name:
                continue
            
            if self.is_field_visible(field_def):
                if field_name in self.data:
                    sanitized[field_name] = self.data[field_name]
        
        return sanitized
