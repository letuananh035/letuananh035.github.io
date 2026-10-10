# Privacy Policy for StoryVerse

* **Application:** StoryVerse: Manga & Novels Reader
* **Package ID:** `com.exceptions.storyverse`
* **Publisher:** Exceptions
* **Effective Date:** October 10, 2026

---

## Summary
StoryVerse is designed with user privacy as a foundational principle. We do not require account registration, we do not collect personal identification information, and all imported local files (EPUB, TXT, CBZ) remain strictly on your device.

---

## 1. Introduction
This Privacy Policy explains how **Exceptions** ("we", "us", or "our") handles user privacy for the **StoryVerse** Android mobile application ("the App"). By installing and using StoryVerse, you acknowledge and agree to the practices described in this policy.

## 2. Information We Do Not Collect
StoryVerse does not require you to create an account or provide any personal information to use the service. Specifically, we do **NOT** collect, store, or share:
- Your name, email address, physical address, or phone number.
- Government-issued identifiers, credit card details, or payment data.
- Precise or coarse GPS location data.
- Device contacts, photos, microphones, or camera feeds.
- Browsing history outside of the App.

## 3. Device Permissions & Local File Access
The App requests minimal permissions strictly necessary to perform its offline reading features:
- **Storage Access (Storage Access Framework - SAF):** When you use the "Import Files" feature to load books or comics (.epub, .txt, .cbz) into your personal library, the App accesses only the individual files you explicitly select via the Android system file picker. These files are processed locally on your device and are **never** transmitted to any external servers.
- **Internet Access (`android.permission.INTERNET`):** Required exclusively to search and load online manga and book metadata from public repositories (MangaDex and Project Gutenberg).
- **Network State (`android.permission.ACCESS_NETWORK_STATE`):** Used to detect whether an active network connection exists before initiating web requests to avoid unnecessary battery and data usage.

## 4. Third-Party Services and Content Providers
StoryVerse acts as a client interface for reading publicly available books and comics. The App communicates with the following external services:
- **MangaDex API ([mangadex.org](https://mangadex.org)):** Used to query manga titles, chapters, and retrieve chapter images via MangaDex@Home distributed network. Please refer to [MangaDex Privacy Policy](https://mangadex.org/privacy) for details on their data handling.
- **Project Gutenberg & Gutendex ([gutendex.com](https://gutendex.com) / [gutenberg.org](https://www.gutenberg.org)):** Used to fetch public domain literary works. No personal information is provided to these services.
- **Conscrypt (Google BoringSSL):** Embedded on-device cryptography provider utilized to establish secure TLS 1.3 encrypted connections. It does not collect or transmit user data.

StoryVerse does **not** integrate third-party advertising SDKs (such as Google AdMob), tracking networks, or third-party behavioral analytics services.

## 5. Local Data Storage & User Control
The App stores your reading progress, theme settings, font size preferences, and library index locally on your device using Android DataStore and internal app storage. You retain complete control over this data at all times:
- You can remove imported stories individually within the "My Library" screen.
- You can clear all reading progress and preferences by clearing the App's storage via Android Settings > Apps > StoryVerse > Clear Data.
- Uninstalling the App permanently deletes all locally stored preferences and cached reading data.

## 6. Security of Your Data
We value your trust. All network communications with external repositories are transmitted over secure, encrypted HTTPS/TLS 1.3 protocols to prevent interception. Offline reading materials remain exclusively stored in your application's private sandbox.

## 7. Children's Privacy (COPPA Compliance)
StoryVerse is not directed at children under the age of 13. We do not knowingly collect or solicit any personal information from children under 13. If you believe that a child has provided us with personal information, please contact us immediately so we can take appropriate steps.

## 8. Changes to This Privacy Policy
We may update our Privacy Policy periodically to reflect changes in legal requirements or app features. Any changes will be posted on this page with an updated "Effective Date". We encourage users to review this page periodically.

## 9. Contact Us
If you have any questions, suggestions, or concerns regarding this Privacy Policy or your data privacy while using StoryVerse, please contact the developer at:
- **Publisher:** Exceptions
- **Email:** letuananh035@gmail.com
- **GitHub:** [github.com/letuananh035](https://github.com/letuananh035)

---
*© 2026 StoryVerse • Developed by Exceptions. All rights reserved.*
