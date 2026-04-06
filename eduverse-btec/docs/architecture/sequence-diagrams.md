# Sequence Diagrams (Textual)

## 1) Login flow
1. Frontend sends `POST /auth/login` to API Gateway.
2. API Gateway forwards to Auth Service.
3. Auth Service validates user and issues access + refresh tokens.
4. API Gateway returns normalized response to frontend.

## 2) Assignment submission + AI review
1. Student submits assignment to Courses Service via Gateway.
2. Courses Service stores metadata and publishes `submission.created` event.
3. AI Service consumes event, runs analysis/plagiarism checks.
4. Grading Service consumes AI result and updates evaluation artifacts.

## 3) NFT certificate issuance
1. Grading Service marks completion.
2. Blockchain Service mints NFT certificate.
3. Transaction hash and tokenId are persisted and returned to frontend.
