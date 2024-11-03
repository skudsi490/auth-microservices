# Project Documentation: Request Management System with Microservices

## Overview and Architecture

This application is a microservices-based Request Management System that includes Single Sign-On (SSO) authentication via Google OAuth, role-based request handling, and email notifications. The diagram illustrates the application flow across microservices:

1. **User-1 (Request Creator)** initiates a request.
2. **SSO Authentication Service** authenticates the user via Google OAuth.
3. After successful login, **Notification Service** sends a login notification email.
4. **Request Management Service** allows User-1 to create a new request.
5. **Notification Service** sends a "Request Created" email to both the request creator and approver.
6. **User-2 (Request Approver)** can then approve or reject the request.
7. The **Request Management Service** updates the request status and notifies **Notification Service** to send an approval or rejection email.
8. **Notification Service** sends an email to the request creator informing them of the request's status.

---

### Architecture Diagram

![Workflow Diagram](https://github.com/skudsi490/auth-microservices/blob/main/Workflow.jpg?raw=true)

### Video Walkthrough

To see a video demonstration of the application in action, [click here to view the screen capture](https://github.com/skudsi490/auth-microservices/blob/main/screen-capture.webm?raw=true).


---

## Implementation Guide

### Prerequisites

Ensure you have:

- **Docker**: for containerized services.
- **Node.js** and **MongoDB** (if not using Docker).
- **Google OAuth credentials** (for SSO).

### Step 1: Unzip the Source Code


### Step 2: Configure Environment Variables

Each service needs an `.env` file. Here are the configurations for each:

**Auth Service `.env`**

```

MONGO_URI=mongodb://host.docker.internal:27017/werkstudentDB
SESSION_SECRET=<session_secret>
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
CALLBACK_URL=http://localhost:4000/auth/google/callback

```

**Notification Service `.env`**

```

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>

```

**Request Service `.env`**

```

PORT=4002
MONGO_URI=mongodb://mongo-db:27017/werkstudentDB
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

```

### Step 3: Docker Setup and Launch

1. Ensure `docker-compose.yml` has the correct settings and network configuration.
2. Run the following command to build and start the application:
    
    ```
    docker-compose up --build

    ```
    

This will start each service in a Docker container.

### Step 4: Access the Application

- **Frontend**: Visit [http://localhost:3000](http://localhost:3000/)
    - **User-1** (Requester): Access request dashboard and create requests.
    - **User-2** (Approver): Access approval dashboard for pending requests.

---

## Service-Specific Details

### 1. **SSO Authentication Service**

- **Purpose**: Manages Google OAuth, session handling, and assigns roles.
- **Endpoints**:
    - `/auth/google` – Initiates Google login.
    - `/auth/google/callback` – Google OAuth callback, sets role-based redirect.
    - `/logout` – Logs the user out and sends a logout notification.

### 2. **Request Management Service**

- **Purpose**: Manages requests (create, approve, reject) and communicates with Notification Service.
- **Endpoints**:
    - `/requests` – Fetch all requests.
    - `/create-request` – Creates a new request.
    - `/approve-request/:id` – Approves a request and notifies the creator.
    - `/reject-request/:id` – Rejects a request and notifies the creator.

### 3. **Notification Service**

- **Purpose**: Sends email notifications for login, logout, request creation, approval, and rejection.
- **Endpoints**:
    - `/notify-login` – Sends login notification.
    - `/notify-logout` – Sends logout notification.
    - `/notify-request` – Sends "request created" notification.
    - `/notify-request-approval` – Sends request approval notification.
    - `/notify-request-rejection` – Sends request rejection notification.

---

## User Guide

1. **User-1 (Request Creator) Workflow**:
    - Login via Google using any email that is *not the supervisor email*.
    - You will be automatically directed to the **Request Dashboard**.
    - From the **Request Dashboard**, you can create new requests.
    - You will receive email notifications for updates on the status of your requests.
2. **User-2 (Request Approver) Workflow**:
    - Login via Google using the **supervisor email** (`skudsi490@gmail.com` in this setup).
    - You will be automatically directed to the **Approval Dashboard**.
    - From the **Approval Dashboard**, you can view pending requests and approve or reject them.
    - When you approve or reject a request, an email notification is sent to the creator with the full request details.