import json
from django.core import serializers
from django.contrib.contenttypes.models import ContentType
from .models import ContentRevision


class SnapshotService:
    @staticmethod
    def create_snapshot(instance, user=None, comment=''):
        """
        Takes a Django model instance, serializes its fields, and saves a new ContentRevision.
        """
        content_type = ContentType.objects.get_for_model(instance)
        object_id = str(instance.pk)

        # Find the latest version number for this object
        latest_revision = ContentRevision.objects.filter(
            content_type=content_type, 
            object_id=object_id
        ).order_by('-version_number').first()
        
        version_number = 1 if not latest_revision else latest_revision.version_number + 1

        # Serialize the instance to JSON
        # Django's serializer returns a list, we just want the single dict representation
        serialized_data = serializers.serialize('json', [instance])
        data_dict = json.loads(serialized_data)[0]['fields']

        return ContentRevision.objects.create(
            content_type=content_type,
            object_id=object_id,
            version_number=version_number,
            snapshot=data_dict,
            created_by=user,
            comment=comment
        )

    @staticmethod
    def restore_snapshot(revision_id):
        """
        Retrieves a ContentRevision, deserializes the snapshot, updates the live object, and saves it.
        """
        revision = ContentRevision.objects.get(id=revision_id)
        
        # Construct a JSON payload that Django's deserializer expects
        # Format: [{"model": "app_label.model_name", "pk": 1, "fields": {...}}]
        payload = [{
            "model": f"{revision.content_type.app_label}.{revision.content_type.model}",
            "pk": revision.object_id,
            "fields": revision.snapshot
        }]
        
        # Deserialize and save
        deserialized_objects = list(serializers.deserialize('json', json.dumps(payload)))
        if deserialized_objects:
            instance = deserialized_objects[0].object
            instance.save()
            return instance
        
        raise ValueError("Failed to deserialize snapshot data.")
