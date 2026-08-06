# Hospital Ranking Algorithm Design

## Overall Score

Final Score =

Resource Match (45%)
+
Capacity (20%)
+
Specialists (15%)
+
Equipment / Resources (10%)
+
ETA (5%)
+
Hospital Availability (5%)

---

## Resource Match

Compare patient required resources with hospital capabilities.

Examples:

ICU -> available_icu > 0

Ventilator -> ventilators > 0

Cardiologist -> specialists contains "Cardiologist"

Neurologist -> specialists contains "Neurologist"

CT Scan -> resources contains "CT Scan"

ECG -> resources contains "ECG"

Cardiac Monitoring -> resources contains "Cardiac Monitoring"

---

## Capacity Score

Higher score when:

- More ICU beds available
- More normal beds available
- More ventilators available

---

## Specialist Score

Score increases when required specialists are available.

---

## Equipment Score

Score increases when required medical equipment/resources are available.

---

## ETA Score

Lower ETA = Higher Score

---

## Hospital Availability

Open hospital = Full score

Closed hospital = Zero score