import  os
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from .models import *

def create_app():

    app = Flask(__name__)
    app.debug = False
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'secret'

    db.init_app(app)
    with app.app_context():
        db.create_all()

    return app
