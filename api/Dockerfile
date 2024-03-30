FROM python:3.10
WORKDIR /api

COPY . .
RUN pip3 install -r requirements.txt
ENV FLASK_ENV production

EXPOSE 5000
CMD ["gunicorn", "--bind", "127.0.0.1:5000", "app:app"]