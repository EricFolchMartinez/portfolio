# Projects

## CertiShot (featured, 2025)
A full-stack app that certifies photographic evidence with RSA digital signatures.
It issues PDF certificates with a QR code for public verification, and
auto-generates descriptions via the OpenAI API. It has a mobile app, a REST
backend, and a public validator, all self-hosted in Docker.
- Stack: React Native (Expo), FastAPI, PostgreSQL, Docker, OpenAI API, RSA.
- Live demo: https://certishot.ericfolch.com
- Public validator: https://validator.ericfolch.com

## Price Tracker (2024)
A modular system that monitors product prices on e-commerce sites (Amazon) and
exposes them through a REST API. Built with a clean service-oriented layout and
deployed via Docker, with a Streamlit dashboard for quick inspection.
- Stack: Python, FastAPI, SQLAlchemy, Streamlit, Docker.

## AI Code Reviewer (2024)
A tool that reviews source code across multiple languages using Llama 3 through the
Groq API, flagging security vulnerabilities and SOLID / Clean Code violations.
Designed around fast inference and structured, actionable feedback.
- Stack: Python, Llama 3, Groq API.
