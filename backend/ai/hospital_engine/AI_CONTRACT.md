# Hospital Ranking Engine Contract

## Function Interface

```python
recommend_hospital(patient_resources, hospitals)
```

## Input

patient_resources: list[str]

Example:

```python
[
    "ICU",
    "Ventilator",
    "Cardiologist",
    "CT Scan"
]
```

hospitals: list[dict]

Each hospital must have:

```python
{
    "id": "...",
    "name": "...",

    "latitude": ...,
    "longitude": ...,

    "available_beds": int,
    "available_icu": int,
    "ventilators": int,

    "specialists": list[str],

    "resources": list[str],

    "hospital_type": str,
    "emergency_level": str,
    "is_open": bool,

    "eta": int
}
```

## Output

```python
{
    "hospital": "...",
    "score": ...,
    "matched_resources": [...],
    "missing_resources": [...]
}
```