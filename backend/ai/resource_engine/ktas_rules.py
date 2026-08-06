"""
LifeRoute AI
KTAS Rules
"""

def get_ktas_resources(ktas):

    resources = set()

    if ktas == 1:
        resources.update([
            "ICU",
            "Emergency Physician",
            "Trauma Team"
        ])

    elif ktas == 2:
        resources.update([
            "Emergency Physician"
        ])

    return resources