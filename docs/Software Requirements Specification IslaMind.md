# Software Requirements Specification

# IslaMind: An AI-Assisted Mental Wellness and Self-Reflection Web Application

**Version:** 1.0<br>**Document Type:** Software Requirements Specification<br>**Primary Platform:** Mobile-first responsive web application<br>**Language:** English<br>**Prepared For:** EXE201<br>**Prepared By:** Pham Ngoc Lam - DE160196 - Isla Group

## Table of Contents

1. Introduction<br>1.1 Purpose<br>1.2 Scope<br>1.3 Definitions, Acronyms, and Abbreviations<br>1.4 References<br>1.5 Document Overview

1. Overall Description<br>2.1 Product Perspective<br>2.2 Product Functions<br>2.3 User Classes and Characteristics<br>2.4 Operating Environment<br>2.5 Design and Implementation Constraints<br>2.6 Assumptions and Dependencies

1. External Interface Requirements<br>3.1 User Interfaces<br>3.2 Software Interfaces<br>3.3 Communication Interfaces

1. System Features and Functional Requirements<br>4.1 User Authentication<br>4.2 User Onboarding<br>4.3 Mood Check-In<br>4.4 Mood Journal<br>4.5 AI Reflection<br>4.6 CBT Thought Record<br>4.7 Reflection Card Feature<br>4.8 Dashboard<br>4.9 Mood History and Insights<br>4.10 Profile and Settings<br>4.11 Monetization Concept Page<br>4.12 Admin Management<br>4.13 Safety and Crisis Keyword Handling

1. Data Requirements<br>5.1 Data Entities<br>5.2 Data Retention<br>5.3 Data Privacy Requirements

1. AI Requirements<br>6.1 AI Provider Abstraction<br>6.2 AI Input Requirements<br>6.3 AI Output Requirements<br>6.4 AI Safety Requirements<br>6.5 AI Limitations

1. Non-Functional Requirements<br>7.1 Performance Requirements<br>7.2 Usability Requirements<br>7.3 Mobile-First Responsiveness Requirements<br>7.4 Security Requirements<br>7.5 Privacy Requirements<br>7.6 Reliability Requirements<br>7.7 Maintainability Requirements<br>7.8 Scalability Requirements<br>7.9 Accessibility Requirements

1. System Architecture<br>8.1 Recommended Technology Stack<br>8.2 High-Level Architecture<br>8.3 Deployment Architecture

1. Out-of-Scope Features

1. Acceptance Criteria

1. Appendix<br>11.1 Suggested Database Tables<br>11.2 Suggested Project Structure

# 1. Introduction

## 1.1 Purpose

The purpose of this Software Requirements Specification is to define the functional and non-functional requirements for **IslaMind: An AI-Assisted Mental Wellness and Self-Reflection Web Application**.

This document is intended for project stakeholders, course instructors, developers, testers, and evaluators. It describes the expected behavior, constraints, system features, user interactions, data requirements, AI behavior, and acceptance criteria for the MVP version of the application.

The system shall be developed as a mobile-first responsive web application within an estimated development period of one month.

## 1.2 Scope

IslaMind helps students and young adults privately reflect on stress, moods, and thoughts through mood tracking, journal entries, AI-generated self-reflection, CBT-style self-help exercises, and playful symbolic reflection tools such as daily reflection cards.

The application is intended to support self-reflection and emotional awareness. It is not intended to provide medical diagnosis, psychotherapy, clinical treatment, crisis intervention, or emergency support.

The MVP shall include the following major features:

- User registration and login.

- User onboarding.

- Mood check-in.

- Mood journal.

- AI-generated reflection.

- CBT Thought Record.

- Daily Reflection Card.

- Mobile-first dashboard.

- Mood history and basic insights.

- Profile and settings.

- Light freemium monetization concept page with mock upgrade flow.

- Safety disclaimer and crisis keyword handling.

The MVP shall not include real payment integration, therapist matching, medical diagnosis, community social feed, image mood-board upload, palm or fingerprint image analysis, or emergency-response services.

## 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
| --- | --- |
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| CBT | Cognitive Behavioral Therapy |
| MVP | Minimum Viable Product |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| RLS | Row-Level Security |
| Supabase | Backend platform providing authentication, database, and related services |
| OpenAI API | External AI API used for generating reflections and self-help content |
| Reflection Card | A symbolic self-reflection prompt feature inspired by card-based introspection |
| Freemium | A monetization model with Basic and Companion feature tiers |

## 1.4 References

This SRS is based on the project scope and technical decisions defined by the project team. The structure follows a formal software requirements format inspired by IEEE-style SRS documentation.

## 1.5 Document Overview

Section 1 introduces the purpose, scope, and terminology of the system.<br>Section 2 describes the overall system context, users, constraints, and assumptions.<br>Section 3 specifies external interface requirements.<br>Section 4 defines system features and functional requirements.<br>Section 5 describes data requirements.<br>Section 6 defines AI-specific requirements.<br>Section 7 defines non-functional requirements.<br>Section 8 describes the proposed system architecture and technology stack.<br>Section 9 lists out-of-scope features.<br>Section 10 defines acceptance criteria.<br>Section 11 provides appendix materials such as suggested database tables and project structure.

# 2. Overall Description

## 2.1 Product Perspective

IslaMind is a standalone web application that combines mood tracking, journaling, AI-assisted reflection, CBT-style exercises, and symbolic self-discovery prompts. The application shall be accessible through modern web browsers on mobile and desktop devices.

The system shall be designed as a full-stack web application using Next.js and TypeScript. Supabase shall be used for authentication and database services. The OpenAI API shall be used for AI-generated reflections, with the implementation designed to support future replacement or extension with other AI providers such as Google Gemini.

The application shall prioritize mobile users because the target audience is expected to access the system primarily through smartphones.

## 2.2 Product Functions

At a high level, IslaMind shall provide the following functions:

1. Allow users to create accounts and log in securely.

1. Allow users to complete a basic onboarding process.

1. Allow users to record daily mood check-ins.

1. Allow users to create, view, edit, and delete journal entries.

1. Generate AI reflections based on user mood and journal data.

1. Suggest CBT-style self-reflection exercises.

1. Provide a structured CBT Thought Record form.

1. Provide a Daily Reflection Card as a symbolic journaling prompt.

1. Display a mobile-first dashboard with mood summary and recent activity.

1. Display mood history and basic insights.

1. Allow users to manage profile and privacy settings.

1. Display a freemium pricing concept with mock payment only.

1. Detect crisis-related keywords and display appropriate safety guidance.

## 2.3 User Classes and Characteristics

### 2.3.1 Guest User

A guest user is an unauthenticated visitor who can view the landing page, product description, pricing concept, and sign-up/login pages.

Expected characteristics:

- May be new to the app.

- May access the app from a mobile browser.

- Cannot access journaling, AI reflection, or personal mood data.

### 2.3.2 Registered User

A registered user is an authenticated user who can access the main features of the application.

Expected characteristics:

- Student or young adult.

- Interested in mood tracking, journaling, self-reflection, or mental wellness.

- Likely to use the app on a smartphone.

- May not have clinical mental-health knowledge.

- Expects a private and simple user experience.

### 2.3.3 Admin User

An admin user is a project team member or evaluator with limited administrative privileges.

Expected characteristics:

- Can view basic system statistics or manage demo content if implemented.

- Does not access private journal content unless explicitly designed for testing with demo accounts.

- Primarily exists for demonstration and project evaluation purposes.

## 2.4 Operating Environment

The system shall operate in the following environment:

| Component | Requirement |
| --- | --- |
| Client Device | Smartphone, tablet, laptop, or desktop |
| Browser | Modern browser such as Chrome, Edge, Safari, or Firefox |
| Frontend Runtime | Next.js web application |
| Backend Runtime | Next.js API routes or server actions |
| Database | Supabase Free PostgreSQL |
| Authentication | Supabase Auth |
| AI Provider | OpenAI API through internal provider abstraction |
| Deployment | Vercel Hobby for web app and server-side routes, Supabase Free for backend services |
| Network | Internet connection required |

## 2.5 Design and Implementation Constraints

The following constraints apply:

- The system shall be developed within approximately one month.

- The system shall prioritize MVP completeness over advanced feature complexity.

- The system shall be developed in English only.

- The system shall prioritize mobile-first responsive design.

- The system shall use TypeScript for improved maintainability and AI-assisted debugging.

- The system shall use free-tier services for hosting, backend, authentication, and database where possible.

- The MVP shall avoid project costs except for LLM API usage.

- The system shall avoid real payment integration in the MVP.

- The system shall avoid features that require medical licensing, clinical supervision, or emergency response.

- The system shall not provide diagnosis or treatment.

- The system shall not store or process palm, fingerprint, or biometric images.

- The system shall not include image mood-board input.

## 2.6 Assumptions and Dependencies

The system depends on the following assumptions:

- Users have access to a modern web browser.

- Users have internet access.

- The project team has access to Supabase Free and Vercel Hobby services.

- The project team has access to an OpenAI API key or can use a mock AI provider for demonstration.

- The MVP will be evaluated primarily as a startup-course prototype rather than a production medical product.

- Users are 18 years old or older.

- The app is intended for self-reflection and general wellness support only.

# 3. External Interface Requirements

## 3.1 User Interfaces

The application shall provide a responsive web interface optimized for mobile devices.

### 3.1.1 Landing Page

The landing page shall include:

- Product name.

- Product tagline.

- Short explanation of the application.

- Feature highlights.

- Call-to-action buttons for sign-up and login.

- Safety disclaimer.

- Link to pricing concept page.

### 3.1.2 Authentication Pages

The authentication interface shall include:

- Sign-up form.

- Login form.

- Logout action.

- Error handling for invalid credentials.

### 3.1.3 Dashboard Interface

The dashboard shall display:

- Current mood summary.

- Quick mood check-in button.

- Recent journal entries.

- Latest AI reflection preview.

- Shortcut to CBT Thought Record.

- Shortcut to Reflection Card.

- Bottom navigation on mobile.

### 3.1.4 Mood Journal Interface

The journal interface shall allow users to:

- Select mood score.

- Select emotions.

- Add tags.

- Write journal text.

- Save, view, edit, and delete entries.

### 3.1.5 AI Reflection Interface

The AI reflection interface shall display:

- Emotional summary.

- Possible recurring themes.

- Suggested reflective questions.

- Suggested CBT exercise.

- Small action recommendation.

- Safety disclaimer where appropriate.

### 3.1.6 CBT Thought Record Interface

The CBT interface shall provide a step-by-step form with the following fields:

- Situation.

- Emotion.

- Automatic thought.

- Evidence supporting the thought.

- Evidence against the thought.

- Balanced thought.

- Mood after reframing.

### 3.1.7 Reflection Card Interface

The Reflection Card interface shall allow users to:

- Draw a daily card.

- View symbolic card meaning.

- View a self-reflection prompt.

- Save a response if desired.

### 3.1.8 Profile and Settings Interface

The profile interface shall allow users to:

- View account information.

- Manage basic preferences.

- View current plan status.

- Delete account or request data deletion if implemented.

- Read safety and privacy statements.

## 3.2 Software Interfaces

### 3.2.1 Supabase Interface

The application shall integrate with Supabase for:

- User authentication.

- Session management.

- PostgreSQL database storage.

- Row-level access control if implemented.

### 3.2.2 OpenAI API Interface

The application shall integrate with the OpenAI API for:

- Generating AI reflections.

- Generating CBT-style suggestions.

- Generating Reflection Card interpretations.

The application shall not expose the OpenAI API key on the client side. All AI requests shall be handled through server-side routes or server actions.

### 3.2.3 AI Provider Abstraction Interface

The application shall define an internal AI provider interface so that OpenAI can be replaced or extended by other providers in the future.

The AI provider abstraction shall support at least:

- Reflection generation.

- CBT suggestion generation.

- Reflection Card generation.

- Mock responses for demo mode.

## 3.3 Communication Interfaces

The application shall use HTTPS for communication between the client, backend, Supabase, and AI provider. All sensitive environment variables shall be stored in secure deployment environment settings.

# 4. System Features and Functional Requirements

## 4.1 User Authentication

### Description

The system shall allow users to create an account, log in, and log out.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-001 | The system shall allow a guest user to register using email and password. |
| FR-002 | The system shall allow a registered user to log in using valid credentials. |
| FR-003 | The system shall allow an authenticated user to log out. |
| FR-004 | The system shall restrict access to journal, reflection, CBT, dashboard, and profile pages to authenticated users. |
| FR-005 | The system shall display an error message when login or registration fails. |
| FR-006 | The system shall maintain user sessions using Supabase Auth. |

## 4.2 User Onboarding

### Description

The system shall collect basic user preferences during first-time use.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-007 | The system shall display an onboarding flow after first registration. |
| FR-008 | The system shall ask the user to select at least one wellness goal. |
| FR-009 | The system shall allow the user to select preferred reflection tone if implemented. |
| FR-010 | The system shall display a disclaimer stating that the app is not a medical or therapy service. |
| FR-011 | The system shall save onboarding completion status. |

## 4.3 Mood Check-In

### Description

The system shall allow users to quickly record their emotional state.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-012 | The system shall allow users to select a mood score from 1 to 10. |
| FR-013 | The system shall allow users to select one or more emotions. |
| FR-014 | The system shall allow users to select optional tags such as study, work, family, relationship, money, health, future, loneliness, or self-esteem. |
| FR-015 | The system shall allow users to optionally enter a short note during mood check-in. |
| FR-016 | The system shall save mood check-in data to the database. |
| FR-017 | The system shall associate each mood check-in with the authenticated user. |
| FR-018 | The system shall display the latest mood check-in on the dashboard. |

## 4.4 Mood Journal

### Description

The system shall allow users to create and manage journal entries.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-019 | The system shall allow users to create a journal entry. |
| FR-020 | The system shall allow users to include free-text journal content. |
| FR-021 | The system shall allow users to associate mood score, emotions, and tags with a journal entry. |
| FR-022 | The system shall allow users to view a list of their own journal entries. |
| FR-023 | The system shall allow users to view details of a selected journal entry. |
| FR-024 | The system shall allow users to edit their own journal entries. |
| FR-025 | The system shall allow users to delete their own journal entries. |
| FR-026 | The system shall not allow users to access journal entries owned by other users. |
| FR-027 | The system shall display timestamps for journal entries. |

## 4.5 AI Reflection

### Description

The system shall generate AI-assisted self-reflections based on journal and mood data.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-028 | The system shall allow users to request an AI reflection for a journal entry. |
| FR-029 | The system shall send relevant journal and mood data to the server-side AI service. |
| FR-030 | The system shall generate an emotional summary based on the user’s input. |
| FR-031 | The system shall identify possible themes or patterns in the journal entry. |
| FR-032 | The system shall suggest at least one reflective question. |
| FR-033 | The system shall suggest at least one small practical action. |
| FR-034 | The system shall suggest a CBT-style exercise when appropriate. |
| FR-035 | The system shall save generated AI reflections to the database. |
| FR-036 | The system shall allow users to view previous AI reflections. |
| FR-037 | The system shall avoid diagnostic language in AI reflections. |
| FR-038 | The system shall display a disclaimer that AI reflection is for self-reflection only. |

## 4.6 CBT Thought Record

### Description

The system shall provide a structured CBT-style Thought Record exercise.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-039 | The system shall allow users to create a CBT Thought Record. |
| FR-040 | The system shall allow users to enter the situation that triggered the thought. |
| FR-041 | The system shall allow users to enter associated emotions. |
| FR-042 | The system shall allow users to enter an automatic thought. |
| FR-043 | The system shall allow users to enter evidence supporting the thought. |
| FR-044 | The system shall allow users to enter evidence against the thought. |
| FR-045 | The system shall allow users to enter a balanced thought. |
| FR-046 | The system shall allow users to enter mood rating after reframing. |
| FR-047 | The system shall save CBT Thought Records to the database. |
| FR-048 | The system shall allow users to view previous CBT Thought Records. |
| FR-049 | The system shall present CBT as a self-help exercise and not as therapy or clinical treatment. |

## 4.7 Reflection Card Feature

### Description

The system shall provide a playful symbolic reflection feature that gives users a daily card and journaling prompt.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-050 | The system shall allow users to draw a Reflection Card. |
| FR-051 | The system shall display a symbolic card title. |
| FR-052 | The system shall display a short card meaning. |
| FR-053 | The system shall display a self-reflection prompt related to the card. |
| FR-054 | The system shall optionally use recent mood or journal data to personalize the card interpretation. |
| FR-055 | The system shall allow users to save a card response if implemented. |
| FR-056 | The system shall clearly indicate that Reflection Card content is for entertainment and self-reflection only. |
| FR-057 | The system shall not present Reflection Card output as factual prediction, supernatural truth, or life decision authority. |

## 4.8 Dashboard

### Description

The system shall provide a central dashboard optimized for mobile use.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-058 | The system shall display a dashboard after user login. |
| FR-059 | The dashboard shall display the user’s latest mood check-in. |
| FR-060 | The dashboard shall display shortcuts to Journal, AI Reflection, CBT, and Reflection Card features. |
| FR-061 | The dashboard shall display recent journal entries. |
| FR-062 | The dashboard shall display a summary of recent mood activity. |
| FR-063 | The dashboard shall use a card-based vertical layout on mobile screens. |
| FR-064 | The dashboard shall provide bottom navigation on mobile devices. |

## 4.9 Mood History and Insights

### Description

The system shall provide basic mood history and insight visualization.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-065 | The system shall display a list or chart of recent mood scores. |
| FR-066 | The system shall allow users to view mood entries by date. |
| FR-067 | The system shall display common emotion tags when data is available. |
| FR-068 | The system shall display basic trend information such as average mood over recent entries. |
| FR-069 | The system shall avoid making clinical conclusions from mood history. |

## 4.10 Profile and Settings

### Description

The system shall allow users to manage basic account and app preferences.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-070 | The system shall allow users to view their profile information. |
| FR-071 | The system shall allow users to update basic preferences if implemented. |
| FR-072 | The system shall display the user’s current plan status. |
| FR-073 | The system shall provide access to safety and privacy information. |
| FR-074 | The system shall allow users to request account deletion or data deletion if implemented in MVP. |

## 4.11 Monetization Concept Page

### Description

The system shall demonstrate a freemium monetization model with a mock payment flow only. New users shall start on the Basic tier by default.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-075 | The system shall display a pricing or upgrade page. |
| FR-076 | The system shall show two plans: Basic and Companion. |
| FR-077 | The Basic plan shall allow access to all features but limit the user to 7 AI requests per day across all AI-powered features. |
| FR-078 | The Basic plan AI request limit shall reset at 00:00 Asia/Bangkok each day. |
| FR-079 | The Companion plan shall cost 6.99 USD per month in the MVP concept and allow unlimited AI requests. |
| FR-080 | The system shall use a mock upgrade flow only: one "Confirm mock payment" button, a "Payment Accepted" result screen, and then update the user's plan status to Companion. |
| FR-080A | The system shall prompt Basic users to upgrade to Companion when they try to use an AI feature after reaching the daily AI request limit. |
| FR-080B | The system shall clearly indicate that monetization and payment are MVP demonstration concepts, not real payment processing. |

## 4.12 Admin Management

### Description

The system may include a minimal admin view for project demonstration.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-081 | The system may allow an admin user to view aggregate demo statistics. |
| FR-082 | The system shall not expose private journal content to admin users by default. |
| FR-083 | The system may allow admin users to view total number of users, mood entries, journal entries, and AI reflections. |
| FR-084 | The system shall restrict admin pages to authorized admin accounts only. |

## 4.13 Safety and Crisis Keyword Handling

### Description

The system shall detect crisis-related language and display supportive safety guidance.

### Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-085 | The system shall check journal text and AI reflection input for crisis-related keywords. |
| FR-086 | The system shall display a safety message when crisis-related keywords are detected. |
| FR-087 | The system shall encourage users in immediate danger to contact local emergency services or a trusted person. |
| FR-088 | The system shall avoid generating normal playful Reflection Card content when crisis risk is detected. |
| FR-089 | The system shall not claim to provide emergency support. |
| FR-090 | The system shall include a clear disclaimer that IslaMind is not a crisis service. |

# 5. Data Requirements

## 5.1 Data Entities

The system shall store the following categories of data:

| Entity | Description |
| --- | --- |
| User | Basic authenticated user identity |
| User Profile | User preferences and onboarding data |
| Mood Entry | Mood score, emotions, tags, note, timestamp |
| Journal Entry | Free-text journal content and associated mood data |
| AI Reflection | AI-generated summary, themes, questions, suggestions |
| CBT Thought Record | Structured CBT exercise responses |
| Reflection Card | Card title, meaning, prompt, and optional user response |
| Plan Status | Basic or Companion status for MVP concept |
| AI Usage Count | Daily AI request count used for Basic plan limits |
| Safety Event | Optional record of crisis keyword detection, if implemented |

## 5.2 Data Retention

| ID | Requirement |
| --- | --- |
| DR-001 | The system shall store user-generated mood and journal data until deleted by the user or project team. |
| DR-002 | The system should allow users to delete journal entries. |
| DR-003 | The system should allow users to delete mood entries. |
| DR-004 | The system should allow users to delete AI reflections associated with their account. |
| DR-005 | The system shall not store image mood-board data because the feature is out of scope. |
| DR-006 | The system shall not store palm, fingerprint, or biometric image data. |

## 5.3 Data Privacy Requirements

| ID | Requirement |
| --- | --- |
| DPR-001 | The system shall associate all private user data with the authenticated user ID. |
| DPR-002 | The system shall prevent users from accessing other users’ private data. |
| DPR-003 | The system shall not use journal content for advertising. |
| DPR-004 | The system shall not sell user mood or journal data. |
| DPR-005 | The system shall display a basic privacy notice to users. |
| DPR-006 | The system shall store API keys and sensitive credentials only in environment variables. |
| DPR-007 | The system shall not expose sensitive credentials to the client-side application. |

# 6. AI Requirements

## 6.1 AI Provider Abstraction

The system shall implement AI functionality through an internal provider abstraction layer.

| ID | Requirement |
| --- | --- |
| AIR-001 | The system shall define an internal AI provider interface. |
| AIR-002 | The system shall implement OpenAI as the default AI provider. |
| AIR-003 | The system shall allow future replacement or extension with other AI providers such as Google Gemini. |
| AIR-004 | The system shall include or support a mock AI provider for demo and testing purposes. |
| AIR-005 | The system shall keep AI provider logic separate from UI components. |

## 6.2 AI Input Requirements

The AI service may use the following inputs:

- Current journal entry.

- Mood score.

- Selected emotions.

- Selected tags.

- Recent mood entries.

- Recent journal summaries.

- User preference settings.

- Selected CBT exercise type.

- Selected Reflection Card context.

| ID | Requirement |
| --- | --- |
| AIR-006 | The system shall send only necessary user data to the AI provider. |
| AIR-007 | The system shall not send unrelated private data to the AI provider. |
| AIR-008 | The system shall process AI requests on the server side. |

## 6.3 AI Output Requirements

The AI service shall generate structured output where possible.

AI Reflection output should include:

- Emotional summary.

- Possible theme.

- Possible cognitive pattern.

- Reflective question.

- Suggested CBT exercise.

- Small practical action.

- Safety note if needed.

| ID | Requirement |
| --- | --- |
| AIR-009 | The system shall request AI output in a structured format where feasible. |
| AIR-010 | The system shall display AI output in readable mobile-friendly sections. |
| AIR-011 | The system shall save AI output to the database when requested by the user or when generated. |
| AIR-012 | The system shall avoid displaying raw technical AI response data to users. |

## 6.4 AI Safety Requirements

| ID | Requirement |
| --- | --- |
| AIR-013 | The AI shall not provide medical diagnosis. |
| AIR-014 | The AI shall not prescribe medication. |
| AIR-015 | The AI shall not claim to replace a therapist, doctor, counselor, or emergency service. |
| AIR-016 | The AI shall not make supernatural claims as factual truth. |
| AIR-017 | The AI shall not tell users to make major life decisions based only on Reflection Card output. |
| AIR-018 | The AI shall use uncertainty language such as “may,” “might,” or “could” when interpreting emotions or patterns. |
| AIR-019 | The AI shall recommend professional support or trusted human support when user content indicates serious distress. |
| AIR-020 | The AI shall not continue normal reflection flow when crisis-related content is detected. |

## 6.5 AI Limitations

The system shall communicate the following limitations to users:

- AI-generated reflections may be inaccurate.

- AI does not know the full context of the user’s life.

- AI cannot diagnose mental-health conditions.

- AI is not a substitute for therapy or medical care.

- Reflection Card content is symbolic and for self-reflection only.

- Users in immediate danger should contact emergency services or trusted people.

# 7. Non-Functional Requirements

## 7.1 Performance Requirements

| ID | Requirement |
| --- | --- |
| NFR-001 | The application shall load the landing page within an acceptable time on a typical mobile internet connection. |
| NFR-002 | The application shall avoid unnecessary large media assets. |
| NFR-003 | Primary mobile interactions shall respond quickly to user input. |
| NFR-004 | AI-generated responses should display a loading state while waiting for completion. |
| NFR-005 | The system should use simple charts and lightweight UI components to maintain performance. |

## 7.2 Usability Requirements

| ID | Requirement |
| --- | --- |
| NFR-006 | The application shall use simple English suitable for non-clinical users. |
| NFR-007 | The application shall minimize friction for daily mood check-in. |
| NFR-008 | The application shall allow journal entry creation within a small number of taps from the dashboard. |
| NFR-009 | The application shall present CBT exercises as step-by-step forms. |
| NFR-010 | The application shall avoid overwhelming users with long blocks of text on mobile screens. |

## 7.3 Mobile-First Responsiveness Requirements

| ID | Requirement |
| --- | --- |
| NFR-011 | The system shall be designed using a mobile-first approach. |
| NFR-012 | The system shall be usable on smartphone screen widths. |
| NFR-013 | The system shall provide bottom navigation on mobile devices. |
| NFR-014 | The system shall use responsive layouts for tablet and desktop screens. |
| NFR-015 | The system shall ensure that all primary flows are accessible on mobile without requiring desktop view. |

## 7.4 Security Requirements

| ID | Requirement |
| --- | --- |
| NFR-016 | The system shall authenticate users before allowing access to private data. |
| NFR-017 | The system shall protect user data from unauthorized access. |
| NFR-018 | The system shall store sensitive credentials in environment variables. |
| NFR-019 | The system shall use server-side API routes or server actions for AI provider calls. |
| NFR-020 | The system shall not expose the OpenAI API key to the client. |
| NFR-021 | The system should use Supabase Row-Level Security where applicable. |

## 7.5 Privacy Requirements

| ID | Requirement |
| --- | --- |
| NFR-022 | The system shall provide a clear privacy notice. |
| NFR-023 | The system shall allow users to delete their own journal entries. |
| NFR-024 | The system shall avoid collecting unnecessary personal information. |
| NFR-025 | The system shall not collect biometric data. |
| NFR-026 | The system shall not include image mood-board upload. |
| NFR-027 | The system shall not use user journal content for targeted advertising. |

## 7.6 Reliability Requirements

| ID | Requirement |
| --- | --- |
| NFR-028 | The system shall display clear error messages when data saving fails. |
| NFR-029 | The system shall display clear error messages when AI generation fails. |
| NFR-030 | The system should provide mock AI responses for demonstration if the AI API is unavailable. |
| NFR-031 | The system shall prevent duplicate submissions where feasible. |

## 7.7 Maintainability Requirements

| ID | Requirement |
| --- | --- |
| NFR-032 | The system shall be written in TypeScript. |
| NFR-033 | The system shall use reusable UI components. |
| NFR-034 | The system shall separate AI provider logic from UI components. |
| NFR-035 | The system shall separate database access logic from presentation components where feasible. |
| NFR-036 | The system shall use consistent naming conventions for files, functions, and database tables. |

## 7.8 Scalability Requirements

| ID | Requirement |
| --- | --- |
| NFR-037 | The system shall be designed to support additional AI providers in the future. |
| NFR-038 | The system shall be designed to support additional CBT exercises in the future. |
| NFR-039 | The system shall be designed to support real payment integration in the future, although not in MVP. |
| NFR-040 | The system shall be designed to support multilingual UI in the future, although MVP shall be English only. |

## 7.9 Accessibility Requirements

| ID | Requirement |
| --- | --- |
| NFR-041 | The system shall use readable font sizes on mobile devices. |
| NFR-042 | The system shall provide sufficient contrast for text and interactive elements. |
| NFR-043 | The system shall make buttons and form inputs large enough for touch interaction. |
| NFR-044 | The system shall provide labels for form inputs. |
| NFR-045 | The system should support keyboard navigation for major flows where feasible. |

# 8. System Architecture

## 8.1 Recommended Technology Stack

The system shall use the following recommended stack:

| Layer | Technology |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui and Radix UI |
| Icons | Lucide React |
| Forms | React Hook Form |
| Validation | Zod |
| Charts | Recharts |
| Authentication | Supabase Auth |
| Database | Supabase Free PostgreSQL |
| AI Provider | OpenAI API |
| AI Abstraction | Internal provider interface |
| Deployment | Vercel Hobby |
| Repository | GitHub |

## 8.2 High-Level Architecture

The system shall follow a full-stack web application architecture.

High-level flow:

1. User accesses the IslaMind web application through a browser.

1. Next.js renders the frontend UI.

1. User authentication is handled by Supabase Auth.

1. User-generated data is stored in Supabase Free PostgreSQL.

1. AI requests are sent from server-side application logic to the AI provider.

1. AI responses are returned to the application and displayed to the user.

1. Generated reflections and exercise results are saved to the database.

Architecture overview:

User Browser<br>   ↓<br>Next.js Web Application on Vercel Hobby<br>   ↓<br>Supabase Free Auth + Supabase Free PostgreSQL<br>   ↓<br>Server-Side AI Provider Layer<br>   ↓<br>OpenAI API / Future AI Provider / Mock AI Provider

## 8.3 Deployment Architecture

The MVP shall prioritize no-cost deployment, except for LLM API usage.

| Component | Deployment Target |
| --- | --- |
| Web Application | Vercel Hobby |
| Server-Side API Routes | Vercel Hobby |
| Database | Supabase Free PostgreSQL |
| Authentication | Supabase Free Auth |
| Environment Variables | Vercel project settings |
| Source Code | GitHub |

The deployment process shall follow this flow:

GitHub Repository → Vercel Deployment → Supabase Backend → OpenAI API

# 9. Out-of-Scope Features

The following features are explicitly out of scope for the MVP:

| Feature | Reason |
| --- | --- |
| Real payment integration | Too complex for 1-month MVP; mock upgrade flow is sufficient |
| Therapist marketplace | Requires clinical, legal, and operational support |
| Medical diagnosis | Outside the scope of a wellness self-reflection app |
| Medication advice | Medical safety risk |
| Emergency response service | Requires professional crisis infrastructure |
| Community or social feed | Moderation burden and safety risk |
| Image mood-board input | Removed from project scope |
| Palm or fingerprint image upload | Biometric/privacy risk |
| Real palmistry analysis | Unnecessary and risky for MVP |
| Voice journaling | Post-MVP complexity |
| Mobile native app | Web app only |
| Multilingual support | MVP is English only |
| Complex admin panel | Not necessary for MVP |
| Real subscription billing | Freemium concept only |

# 10. Acceptance Criteria

The MVP shall be considered acceptable if the following criteria are met.

## 10.1 Core Application Criteria

| ID | Acceptance Criterion |
| --- | --- |
| AC-001 | A user can register, log in, and log out. |
| AC-002 | A user can complete onboarding. |
| AC-003 | A user can create a mood check-in. |
| AC-004 | A user can create, view, edit, and delete a journal entry. |
| AC-005 | A user can generate an AI reflection from a journal entry. |
| AC-006 | A user can complete and save a CBT Thought Record. |
| AC-007 | A user can draw and view a Reflection Card. |
| AC-008 | A user can view a dashboard showing recent mood and journal activity. |
| AC-009 | A user can view basic mood history or trend information. |
| AC-010 | A user can view a pricing or monetization concept page. |
| AC-010A | A new user starts on the Basic plan by default. |
| AC-010B | A Basic user is limited to 7 AI requests per day across AI-powered features. |
| AC-010C | A Basic user's AI request limit resets at 00:00 Asia/Bangkok. |
| AC-010D | A Basic user who reaches the AI request limit sees an upgrade prompt before any additional AI request is sent. |
| AC-010E | A user can complete a mock upgrade using one "Confirm mock payment" button, see "Payment Accepted", and then have plan status changed to Companion. |

## 10.2 Mobile-First Criteria

| ID | Acceptance Criterion |
| --- | --- |
| AC-011 | All primary user flows work on smartphone screen sizes. |
| AC-012 | The app provides usable mobile navigation. |
| AC-013 | Forms are readable and usable on mobile screens. |
| AC-014 | Dashboard cards display properly on mobile screens. |
| AC-015 | The app does not require desktop view for normal use. |

## 10.3 AI Criteria

| ID | Acceptance Criterion |
| --- | --- |
| AC-016 | AI reflection is generated through a server-side API flow. |
| AC-017 | AI provider calls do not expose the API key to the client. |
| AC-018 | AI output avoids diagnosis and medical claims. |
| AC-019 | AI output includes at least one reflective question or practical suggestion. |
| AC-020 | A mock AI response can be used if real AI API access is unavailable. |

## 10.4 Safety Criteria

| ID | Acceptance Criterion |
| --- | --- |
| AC-021 | The app displays a disclaimer that it is not therapy, medical care, or emergency support. |
| AC-022 | The app detects basic crisis-related keywords. |
| AC-023 | The app displays safety guidance when crisis-related content is detected. |
| AC-024 | The app does not provide normal playful Reflection Card output during crisis detection. |
| AC-025 | The app encourages users in immediate danger to contact emergency services or trusted people. |

## 10.5 Privacy and Security Criteria

| ID | Acceptance Criterion |
| --- | --- |
| AC-026 | A user cannot view another user’s journal entries. |
| AC-027 | Sensitive API keys are not exposed in client-side code. |
| AC-028 | Journal and mood entries are associated with the authenticated user. |
| AC-029 | The app does not collect image mood-board data. |
| AC-030 | The app does not collect palm, fingerprint, or biometric image data. |

# 11. Appendix

## 11.1 Suggested Database Tables

### users

Managed by Supabase Auth.

### profiles

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | References authenticated user ID |
| display_name | text | User display name |
| onboarding_completed | boolean | Whether onboarding is completed |
| preferred_tone | text | Optional AI tone preference |
| plan | text | basic or companion; defaults to basic |
| daily_ai_request_count | integer | Number of AI requests used for the current Asia/Bangkok day |
| daily_ai_request_date | date | Asia/Bangkok date used to reset the daily AI request count |
| created_at | timestamp | Profile creation time |
| updated_at | timestamp | Profile update time |

### mood_entries

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | Mood entry ID |
| user_id | uuid | Owner user ID |
| mood_score | integer | Mood score from 1 to 10 |
| emotions | text[] | Selected emotions |
| tags | text[] | Selected tags |
| note | text | Optional mood note |
| created_at | timestamp | Creation timestamp |

### journal_entries

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | Journal entry ID |
| user_id | uuid | Owner user ID |
| mood_score | integer | Optional mood score |
| emotions | text[] | Selected emotions |
| tags | text[] | Selected tags |
| content | text | Journal text |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Update timestamp |

### ai_reflections

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | Reflection ID |
| user_id | uuid | Owner user ID |
| journal_entry_id | uuid | Related journal entry |
| summary | text | AI emotional summary |
| themes | text[] | Possible themes |
| cognitive_patterns | text[] | Possible thinking patterns |
| reflective_questions | text[] | Suggested reflection questions |
| suggested_action | text | Suggested small action |
| suggested_exercise | text | Suggested CBT-style exercise |
| raw_response | jsonb | Optional structured AI response |
| created_at | timestamp | Creation timestamp |

### cbt_thought_records

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | CBT record ID |
| user_id | uuid | Owner user ID |
| situation | text | Triggering situation |
| emotions | text[] | Associated emotions |
| automatic_thought | text | Automatic thought |
| evidence_for | text | Evidence supporting thought |
| evidence_against | text | Evidence against thought |
| balanced_thought | text | Reframed thought |
| mood_after | integer | Mood rating after reframing |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Update timestamp |

### reflection_cards

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | Card draw ID |
| user_id | uuid | Owner user ID |
| card_title | text | Reflection card title |
| card_meaning | text | Symbolic meaning |
| prompt | text | Reflection prompt |
| user_response | text | Optional user response |
| created_at | timestamp | Creation timestamp |

### safety_events

| Field | Type | Description |
| --- | --- | --- |
| id | uuid | Safety event ID |
| user_id | uuid | Owner user ID |
| source_type | text | journal, reflection, card, or other |
| matched_keywords | text[] | Detected crisis-related keywords |
| created_at | timestamp | Creation timestamp |

## 11.2 Suggested Project Structure

islamind/<br>├─ app/<br>│  ├─ page.tsx<br>│  ├─ login/<br>│  ├─ register/<br>│  ├─ onboarding/<br>│  ├─ dashboard/<br>│  ├─ journal/<br>│  ├─ reflect/<br>│  ├─ cbt/<br>│  ├─ tools/<br>│  ├─ pricing/<br>│  ├─ profile/<br>│  └─ api/<br>│     ├─ ai/<br>│     │  ├─ reflection/<br>│     │  ├─ cbt/<br>│     │  └─ card/<br>│     └─ safety/<br>├─ components/<br>│  ├─ ui/<br>│  ├─ layout/<br>│  ├─ mood/<br>│  ├─ journal/<br>│  ├─ reflection/<br>│  ├─ cbt/<br>│  ├─ cards/<br>│  └─ dashboard/<br>├─ lib/<br>│  ├─ supabase/<br>│  ├─ ai/<br>│  │  ├─ ai-provider.ts<br>│  │  ├─ openai-provider.ts<br>│  │  ├─ mock-provider.ts<br>│  │  └─ prompts/<br>│  ├─ safety/<br>│  ├─ validation/<br>│  └─ utils/<br>├─ types/<br>├─ hooks/<br>├─ middleware.ts<br>├─ package.json<br>├─ tailwind.config.ts<br>└─ README.md

# End of Document
