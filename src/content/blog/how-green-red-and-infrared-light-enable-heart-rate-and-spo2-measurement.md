---
title: "How Green, Red and Infrared Light Enable Heart Rate and SpO₂ Measurement"
description: "How wavelength selection, tissue optics, photoplethysmography and pulse oximetry work together in wearable optical sensors."
pubDate: 2026-09-04
author: "Gonul Demir"
category: optical-sensing-system-design
subcategory: Wearable Optical Sensors
readingTime: 8
---

# How Green, Red and Infrared Light Enable Heart Rate and SpO₂ Measurement

A smartwatch flashing green light against the skin may look simple from the outside. In reality, that small optical window contains a carefully designed sensing system in which wavelength, tissue absorption, blood volume, photodiode sensitivity, geometry and signal processing all interact.

Photoplethysmography, or PPG, is now one of the key optical sensing technologies used in wearable devices such as smartwatches and fitness trackers. It allows physiological information including heart rate and pulse-related parameters to be extracted from changes in detected light intensity. Modern PPG systems can also use multiple wavelengths to obtain information related to blood oxygen saturation and other hemodynamic properties. [1]

The important point is that the LEDs do not simply illuminate the skin.

Different wavelengths interact with tissue and blood differently.

That is why green, red and infrared light are not interchangeable.

## 1. From Light to a Physiological Signal

A basic reflective PPG sensor contains two main optical elements:

- one or more LEDs,
- a photodiode.

The LED sends light into the skin. Some photons are absorbed, some are scattered inside the tissue, and a fraction returns toward the photodiode.

The detector therefore receives a signal whose intensity depends on the optical properties of skin, blood and surrounding tissue.

During each cardiac cycle, arterial blood volume changes slightly.

When blood volume increases, the optical absorption and scattering path also changes. This produces a small pulsating variation in the detected light.

This time-varying component is the origin of the PPG waveform.

The detected signal can conceptually be separated into two parts:

**DC component**  
The relatively slowly varying background contribution from tissue, venous blood, average arterial blood volume and optical coupling.

**AC component**  
The pulsatile component associated mainly with changes occurring during the cardiac cycle.

Heart rate can then be derived from the repetition frequency of this pulsatile waveform.

![Simplified reflective PPG principle](./images/ppg-reflective-principle.png)

*Figure 1. Simplified architecture of a reflective photoplethysmography sensor. Light emitted by the LED is scattered and absorbed inside tissue before part of it returns to the photodiode.*

## 2. Why Does Wavelength Matter?

Human tissue is not optically neutral.

Melanin, water, hemoglobin and other tissue constituents absorb light differently depending on wavelength. Scattering also changes with wavelength.

Hemoglobin is particularly important for PPG because its optical absorption spectrum changes depending on whether oxygen is bound to it.

Oxygenated hemoglobin, HbO₂, and deoxygenated hemoglobin, Hb, therefore have different extinction spectra. Scott Prahl's widely used compilation of hemoglobin optical data clearly shows that oxygen binding changes the absorption spectrum of hemoglobin. [2]

This wavelength dependence creates an important engineering opportunity.

Instead of asking only:

**“How much light came back?”**

we can ask:

**“How did the returned optical signal change at different wavelengths?”**

That difference is the basis of multi-wavelength physiological sensing.

![Hb and HbO2 absorption spectra](./images/hemoglobin-absorption-spectrum.png)

*Figure 2. The absorption spectra of oxygenated and deoxygenated hemoglobin are wavelength dependent. This spectral difference enables optical discrimination between the two states of hemoglobin.*

## 3. Green Light: Why It Is So Useful for Heart-Rate Measurement

Most wrist-worn heart-rate monitors use green LEDs, commonly in the region around 520–550 nm.

There is a practical reason.

Hemoglobin absorbs green light relatively strongly. As the arterial blood volume changes during each heartbeat, the returned green-light intensity therefore changes noticeably.

This can produce a strong pulsatile component suitable for extracting heart rate.

Green light also tends to probe relatively superficial vascular structures compared with longer red and infrared wavelengths. For wrist-based measurements, where the optical geometry is reflective rather than transmissive, this can be advantageous.

Research comparing different wavelengths has also shown why green became so important in wearable PPG.

A study evaluating red, green and blue reflection-mode PPG under motion found that green provided particularly good performance for heart-rate and normalized pulse-volume measurements in the presence of motion artefacts. Green and blue PPG also showed higher signal-to-noise ratio than red in that experimental setup. [3]

The importance of green illumination in modern wearables is also emphasized in the 2023 wearable PPG roadmap, which discusses wavelength selection as a central sensor-design parameter. [1]

But it is important not to oversimplify this point.

Green is not universally “the best wavelength.”

Its performance depends on:

- measurement location,
- skin optical properties,
- LED power,
- source-detector spacing,
- photodiode response,
- motion,
- contact pressure,
- algorithm design.

The correct engineering question is therefore not:

**“Which LED color is best?”**

It is:

**“Which wavelength provides the best signal for this physiological parameter, tissue location and sensor geometry?”**

## 4. Red and Infrared Light: The Basis of SpO₂ Measurement

Heart-rate measurement can be performed using a single optical wavelength.

SpO₂ estimation requires more information.

Pulse oximetry takes advantage of the fact that oxygenated and deoxygenated hemoglobin interact differently with red and near-infrared light.

Typical pulse oximetry systems commonly use wavelengths near:

- **Red: approximately 660 nm**
- **Infrared: approximately 880–940 nm**

Around 660 nm, deoxygenated hemoglobin absorbs red light more strongly than oxygenated hemoglobin.

At infrared wavelengths around 940 nm, the relationship between Hb and HbO₂ absorption is different.

That spectral contrast allows the sensor to extract information related to oxygen saturation.

Pulse oximetry has long used photoplethysmographic signals from two wavelengths, generally one in the red region and one in the infrared region. [4]

However, the device does not simply measure the absolute red and infrared intensities.

That would be unreliable because absolute light level is strongly influenced by many unrelated factors:

- finger or wrist thickness,
- skin pigmentation,
- LED intensity,
- photodiode responsivity,
- optical coupling,
- source-detector distance,
- tissue scattering.

Instead, pulse oximetry uses the pulsatile part of the optical signal.

## 5. The Ratio-of-Ratios

For each wavelength, the PPG waveform contains an AC and DC component.

A normalized pulsatile quantity can therefore be calculated:

\[
\frac{AC}{DC}
\]

The red and infrared normalized signals are then compared:

\[
R =
\frac{(AC/DC)_{Red}}
{(AC/DC)_{IR}}
\]

This quantity is commonly called the **ratio-of-ratios**.

The method is fundamental to conventional pulse oximetry. Literature on pulse oximeter fundamentals describes this ratio as the basis for relating two-wavelength PPG signals to arterial oxygen saturation. [4][5]

Commercial systems typically determine SpO₂ from this ratio using empirical calibration relationships or lookup tables rather than relying only on an ideal Beer–Lambert-law calculation.

Conceptually:

\[
R \rightarrow Calibration\ Curve \rightarrow SpO_2
\]

The calibration step matters because biological tissue is a strongly scattering medium.

The optical path is therefore considerably more complicated than light simply travelling through a transparent sample.

![Pulse oximetry ratio of ratios concept](./images/spo2-ratio-of-ratios.png)

*Figure 3. Simplified pulse-oximetry signal chain. The normalized pulsatile components of red and infrared PPG signals are combined to form the ratio-of-ratios, which is mapped to an SpO₂ estimate.*

## 6. Why Red and IR Penetrate Differently from Green

Wavelength affects more than hemoglobin absorption.

It also changes how deeply photons can travel before they are absorbed or scattered away.

Shorter visible wavelengths generally experience stronger interaction with superficial tissue structures, while red and near-infrared wavelengths can penetrate farther into biological tissue.

This does not mean that every infrared photon travels to a fixed depth.

Optical penetration is statistical.

A PPG photodiode receives photons that have travelled through many different paths, experiencing multiple scattering events before reaching the detector.

Therefore, the phrase **“penetration depth”** should be understood as an effective sampling behaviour rather than a sharp physical boundary.

This is particularly important in reflective wearable sensors.

The distance between LED and photodiode affects which photon paths are likely to reach the detector.

A greater source-detector spacing can increase sensitivity to deeper tissue, but it also reduces received optical power.

That produces a classic sensor-design trade-off:

**deeper optical sampling versus signal amplitude.**

![Conceptual optical sampling depths](./images/green-red-ir-penetration.png)

*Figure 4. Conceptual comparison of optical sampling paths for green, red and infrared light in tissue. Actual penetration depends on wavelength, tissue composition, source-detector spacing and optical geometry. Paths are conceptual and not to scale.*

## 7. A Wearable PPG Sensor Is More Than an LED and Photodiode

From an electronics perspective, the optical front end is only the beginning.

A practical wearable PPG signal chain may include:

### LED Driver

The LED current determines optical power.

Too little optical power reduces signal amplitude.

Too much wastes battery power and may saturate the photodiode or analog front end.

### Photodiode

The photodiode converts received optical power into current.

Its spectral responsivity must be considered together with the selected LED wavelengths.

### Transimpedance Amplifier or Integrated Analog Front End

Photodiode currents are small.

The current therefore has to be converted into a measurable voltage and amplified while preserving the small pulsatile component.

### Ambient-Light Cancellation

Sunlight and indoor illumination can produce optical signals much larger than the desired pulsatile component.

Modern optical AFEs often include methods for estimating and removing ambient-light contributions.

### ADC

The analog signal is digitized for further processing.

ADC resolution and dynamic range become important because the useful AC component may be small compared with the total DC optical signal.

### Digital Signal Processing

Filtering and algorithms extract parameters such as:

- heart rate,
- pulse interval,
- pulse morphology,
- SpO₂.

Motion artefact suppression is especially important in wearable systems.

## 8. Motion: One of the Hardest Problems in Wearable PPG

The useful PPG signal can be very small.

Unfortunately, movement also changes optical coupling between the sensor and skin.

Even slight movement can change:

- contact pressure,
- optical path length,
- tissue deformation,
- blood distribution,
- sensor position.

The resulting artefact may occur in the same frequency range as the heartbeat.

That makes motion rejection much more difficult than simply applying a low-pass or high-pass filter.

Modern wearables therefore often combine PPG data with accelerometer information and adaptive signal-processing algorithms.

A major review of PPG measurement errors identifies motion and several physiological and sensor-related variables as important sources of measurement inaccuracy. [6]

This is one reason why sensor mechanical design is just as important as the optical circuit.

A poorly fitted sensor can produce bad data even if the LED driver and photodiode amplifier are electrically excellent.

## 9. Skin Pigmentation and Optical Measurement

Melanin also absorbs light.

Its absorption is stronger toward shorter visible wavelengths and decreases toward longer wavelengths.

This means skin pigmentation can alter the amount of light reaching and returning from vascular tissue.

For an engineer, this creates several design considerations:

- LED optical power may need adaptation,
- photodiode dynamic range must accommodate large variations,
- analog gain may need adjustment,
- algorithms should be validated across a wide range of skin tones.

The wearable PPG literature increasingly treats this not only as an optical problem, but also as a validation and system-design issue. [1][6]

A device that performs well for one optical condition cannot automatically be assumed to perform equally well for all users.

## 10. Contact Pressure Matters Too

Even without motion, pushing the sensor more strongly against the skin changes the measurement.

Pressure alters local tissue geometry and blood distribution.

Too little pressure can create a poor optical interface and allow ambient light to enter.

Too much pressure can compress superficial blood vessels.

Wearable PPG therefore operates inside a mechanical-optical-electrical system.

The electronics cannot be designed independently from:

- enclosure,
- optical window,
- skin contact,
- LED-photodiode spacing,
- mechanical pressure.

This is an important lesson for sensor design in general.

## 11. Green, Red and IR Are Not Three Independent Sensors

It is tempting to summarize a wearable optical sensor as:

**Green = heart rate**  
**Red = SpO₂**  
**IR = SpO₂**

This is useful as an introduction, but it hides the real engineering.

Each wavelength is a different optical probe of the same biological system.

Green light is highly useful for detecting pulsatile blood-volume variation in many wearable heart-rate applications.

Red and infrared provide complementary information because Hb and HbO₂ exhibit different wavelength-dependent absorption.

When several wavelengths are combined, the system can distinguish optical effects that would be difficult or impossible to separate with one wavelength alone.

Multi-wavelength PPG therefore turns wavelength itself into an additional sensing dimension.

## 12. The Broader Sensor-Design Lesson

One of the most interesting aspects of PPG is that the sensor does not directly measure heart rate or oxygen saturation.

The photodiode measures light.

Everything else is inferred.

The physical chain is:

\[
\text{Physiology}
\rightarrow
\text{Blood volume / oxygenation}
\rightarrow
\text{Optical properties}
\rightarrow
\text{Photon transport}
\rightarrow
\text{Photodiode current}
\rightarrow
\text{Analog signal}
\rightarrow
\text{Digital estimation}
\]

Every stage introduces its own uncertainty.

That is what makes wearable optical sensing both elegant and difficult.

A small optical module on the wrist combines:

- semiconductor light sources,
- photodetectors,
- analog electronics,
- optical physics,
- tissue interaction,
- signal processing,
- calibration,
- mechanical design.

The LED color is therefore not a cosmetic choice.

**Wavelength is part of the sensor architecture.**

## References

**[1]** P. H. Charlton et al., “The 2023 wearable photoplethysmography roadmap,” *Physiological Measurement*, vol. 44, no. 11, 111001, 2023.  
DOI: 10.1088/1361-6579/acead2  
https://pubmed.ncbi.nlm.nih.gov/37494945/

**[2]** S. Prahl, “Optical Absorption of Hemoglobin,” Oregon Medical Laser Center.  
https://omlc.org/spectra/hemoglobin/

**[3]** “iPhone 4s photoplethysmography: which light color yields the most accurate heart rate and normalized pulse volume using the iPhysioMeter Application in the presence of motion artifact?”  
PubMed PMID: 24618594  
https://pubmed.ncbi.nlm.nih.gov/24618594/

**[4]** M. Nitzan et al., “Pulse oximetry: fundamentals and technology update,” 2014.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC4099100/

**[5]** “Pulse Oximetry with Two Infrared Wavelengths without Calibration in Extracted Arterial Blood,” *Sensors*, 2018.  
https://www.mdpi.com/1424-8220/18/10/3457

**[6]** J. Fine et al., “Sources of Inaccuracy in Photoplethysmography for Continuous Cardiovascular Monitoring,” *Biosensors*, vol. 11, no. 4, 126, 2021.  
DOI: 10.3390/bios11040126  
https://pubmed.ncbi.nlm.nih.gov/33923469/

**[7]** D. Castaneda et al., “A review on wearable photoplethysmography sensors and their potential future applications in health care,” *International Journal of Biosensors & Bioelectronics*, vol. 4, no. 4, pp. 195–202, 2018.  
https://pubmed.ncbi.nlm.nih.gov/30906922/
