import  os
from flask import Flask, Blueprint
from flask_praetorian import Praetorian
from flask_cors import CORS
from .models import *


main = Blueprint("main", __name__)
cors = CORS()
guard = Praetorian()

@main.route('/')
def index():
    return '<h1>Blueprint Index Page</h1>'

def create_app():

    app = Flask(__name__)
    app.debug = False
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SECRET_KEY'] = 'secret'
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}


    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    cors.init_app(app)

    with app.app_context():
        guard.init_app(app, Student)

    return app

curriculums = f'''
West-African Examinations Council, National Examination Council (Nigeria), Senior High School (Ghana),\
Competency Based Curriculum (Kenya), South Sudan National Curriculum, Eritrean Secondary Education \
Certificate
'''
Subjects = f'''
Mathematics, English, Chemistry, Physics, Agriculture, Civic Education, Visual-Arts, Frenc, Technical-Drawing \
 and Economics
'''

system_message = f'''
You're an instructor for O'level African Students who need tuelage in {Subjects}, their demography cuts across different \
region although you will be dealing with students operating with these curriculums, {curriculums}. \
Provide concise answers to their prompts, giving detailed examples where necessary to buttress a point. \
If a question is repeated more than thrice, add referrals to study materials that may help improve students' learning. 
'''
