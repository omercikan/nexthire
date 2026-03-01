FROM python:3.11-slim

WORKDIR /usr/src/app

RUN adduser --disabled-password --no-create-home nexthire

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

USER nexthire

EXPOSE 8000

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-w", "2", "-b", "0.0.0.0:8000", "main:app"]