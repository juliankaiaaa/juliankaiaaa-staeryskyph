# Proposal

The submitted version is my Canvas answer for m8a1. This copy lives in the
repository so the plan and the code sit next to each other.

## 1. App name

| | |
| --- | --- |
| Working title | Staery Sky PH |
| App type | A portfolio for my business. |

## 2. What the app is for, in one sentence

Staery Sky PH is a business portfolio website that is tailored for its
target buyers, review its purchase assistance and address rental services,
understand the ordering process, and send an inquiry or request through one
organized platform.

## 3. Who is it for

| Target user | What they need | What they are trying to do |
| --- | --- | --- |
| Collectors and merchandise buyers | A clear explanation of available purchase assistance, pasabuy, address rental, and shipping services. | They want to find out whether the shop can assist with an item from Korea, Japan, or Thailand before sending a message. |
| New customers who discover the business through social media | Trustworthy business information, service descriptions, and a contact option. | They want to understand what the shop does and decide whether it is reliable enough to handle their order. |
| Returning customers | A faster way to review service options and send a new request. | They want to avoid repeatedly asking for the same basic information and proceed directly to an inquiry form. |

## 4. Sections or routes this app needs

| # | Section / route | Purpose | Main content |
| --- | --- | --- | --- |
| 1 | Home | Introduces the business and directs visitors to the most important information. | Hero section, short business introduction, featured services, and call-to-action buttons. |
| 2 | About | Explains the identity, purpose, mission, vision, and strengths of Staery Sky PH. | Business background, mission, vision, and Why Choose Us section. |
| 3 | Services | Displays the services offered and explains the basic process of requesting assistance. | Services, service descriptions, How It Works steps, and request button. |
| 4 | Contact / Request | Allows a visitor to submit an inquiry or purchase assistance request. | Contact form, inquiry details, contact information, and submission feedback. |

The application uses four main routes because each one has a clear and
necessary purpose. The Home page acts as the entry point, the About page
builds trust, the Services page explains what the business can do, and the
Contact or Request page allows the user to take action. Keeping the project
to four routes makes the first version manageable while still presenting
the business completely.

A separate product catalog or checkout page was not included in the first
version because the business mainly processes requests through direct
assistance. A complete e-commerce system would require inventory
management, payments, order tracking, and user accounts, which are outside
the scope of this project.

## 5. State: what data does the app hold?

| Data | Shape (rough) | Who owns it | Changes when... |
| --- | --- | --- | --- |
| Service list | `[{ id, title, country, description, image, featured }]` | ServicesPage or App | The developer adds, edits, removes, or marks a service as featured. |
| Contact form values | `{ firstName, lastName, email, service, message }` | ContactForm | The user types in an input, selects a service, or edits the message. |
| Form errors | `{ firstName, email, message }` | ContactForm | Validation runs and a required field is empty or contains invalid information. |
| Submission status | `'idle' \| 'submitting' \| 'success' \| 'error'` | ContactForm | The user submits the form and the app processes the request. |
| Selected navigation route | String or React Router location | Navigation / Router | The visitor opens a different page. |
| Mobile menu state | Boolean | NavBar | The user opens or closes the navigation menu on a smaller screen. |

## 6. What the most important screen contains

The Contact / Request page was identified as the most important screen,
since it's where a visitor takes action.

| Block / component | Description |
| --- | --- |
| NavBar | Displays the business name and links to Home, About, Services, and Contact. |
| PageHeader | Shows the title "Got a Request?" and a short instruction explaining what information the visitor should provide. |
| ContactForm | Contains the visitor's first name, last name, email address, preferred service, and message or request details. |
| FormField | A reusable input component used for text fields, email fields, and service selection. |
| SubmitButton | Submits the request and changes its label or appearance while the form is processing. |
| ValidationMessage | Displays a clear message when a required field is missing or invalid. |
| SuccessMessage | Confirms that the request has been submitted successfully. |
| ContactDetails | Shows the business social media account or other approved contact method. |
| Footer | Provides navigation links and the business copyright information. |

## 7. Content needed

| Content needed | Specific items | Why it is needed |
| --- | --- | --- |
| Business identity | Official shop name, short tagline, logo or text-based wordmark, and brand description. | These establish the identity of Staery Sky PH throughout the website. |
| About content | Business background, purpose, mission, vision, and reasons customers may choose the shop. | These provide meaningful content for the About page and help build trust. |
| Service information | Names and descriptions of services such as Korea, Japan, and Thailand purchase assistance or address rental. | These become the reusable service card data displayed on the Home and Services pages. |
| Process information | The four steps: message the shop, fill out the request form, wait while the order is processed, and wait for the order to arrive. | These explain the customer journey in the How It Works section. |
| Images and icons | Business-related photos, K-pop merchandise images, packaging images, country or service icons, and decorative visuals. | These make the portfolio look complete and support the service descriptions. |
| Contact information | Official social media username, email address. | These allow users to continue their inquiry outside the website when necessary. |
| Footer content | Navigation links, copyright text. | These complete every page and provide consistent information. |

## 8. One risk

**Main risk:** Building a complete and reliable contact form with
validation, submission states, and clear feedback.

**Why it is a risk:** The form requires several React concepts to work
together, including controlled inputs, state updates, validation,
conditional rendering, and possibly an external service or backend if the
form must send real data.

**Plan to reduce the risk:** Build the form in small steps. First, create
the input layout. Second, connect every field to React state. Third, add
required-field and email validation. Fourth, add submitting and success
messages. Only after the local version works should it be connected to a
real submission service.

## What's changed since this was written

This proposal was the starting plan. The build moved past parts of it, as
expected:

- **A fifth route was added.** The proposal scoped the app to four routes.
  An Admin page (`/#/admin`) was added for the shop owner to review and
  manage inquiries. It's intentionally not linked from the public
  navigation, so it doesn't change the four-route experience a visitor
  sees.
- **The backend plan changed.** "Possibly an external service or backend"
  (the stated risk in section 8) became a real decision: the form is
  connected to Supabase, not a custom server. That removed the need to
  build and host a separate backend, which was the harder half of the
  risk in section 8.
- **The service list grew.** The proposal's example services (Korea,
  Japan, Thailand, address rental) are four of the eight services the site
  now actually offers. Weverse, Bunjang, Mercari Japan, and Consolidation
  were added.
- **The "Contact / Request" page is called "Request" in the app**, and its
  heading is "Got A Request?" as planned, but the page is reached from the
  nav as "Connect," not "Contact."
- **The form fields differ slightly from the state plan in section 5.**
  The actual request form's fields are service-specific (defined in
  `data/inquiryForms.js`) rather than one fixed `{ firstName, lastName,
  email, service, message }` shape, since different services ask for
  different details (for example, an item link for purchase assistance).
  The submission states (`idle`, `submitting`, `success`, `error`) match
  what was proposed.
