import  os
from flask import Flask
from .models import *

def create_app():

    app = Flask(__name__)
    app.debug = False
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'secret'
    # app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    # app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

    db.init_app(app)
    
    # migrate.init_app(app, db)
    '''
    with app.app_context():
        db.create_all()
        r = Region('West-Africa') 
        r1 = Region('East-Africa')
        r2 = Region('Central-Africa')
        r3 = Country('Nigeria', 1)
        r4 = Country('Ghana', 1)
        r5 = Country('Benin', 1)
        r6 = Country('Kenya', 2)
        r7 = Country('South-Sudan', 2)
        r8 = Country('Eritrea', 2)
        r10 = Country('Ethiopia', 2)
        r11 = Country('Congo', 3)
        r12 = Country('Rwanda', 3)
        r13 = Country('Angola', 3)
        r14 = Curriculum('WAEC', 1)
        r15 = Curriculum('NECO', 1)
        r16 = Curriculum('WAEC', 2)
        r17 = Curriculum('SHS', 2)
        r18 = Curriculum('WAEC', 3)
        r19 = Curriculum('CBC', 4)
        r20 = Curriculum('SSNC', 5)
        r21 = Curriculum('ESECE', 6)
        r22 = Subject('Mathematics', 1)
        r23 = Subject('Physics', 1)
        r24 = Subject('English', 1)
        r25 = Subject('Chemistry', 1)
        r26 = Subject('Agriculture', 1)
        r27 = Subject('Civic Education', 1)
        r28 = Subject('Visual-Arts', 1)
        r29 = Subject('French', 1)
        r30 = Subject('Technical-Drawing', 1)
        r31 = Subject('Economics', 1)
        r30 = Topic('Nuclear Fission', 4,
                    'Nuclear fission is a reaction which the nucleus of an atom splits into two or more\
smaller nuclei. The fission process often produces gamma photons, and releases a very\
large ammount of energy even by the energetic standards of radioactive decay. Nuclear\
fission was discovered on 19 December 1938 by German chemists Otto Han and Fitz Strassman\
. Physiscists Lise Meitner and her nephew Otto Robert Frisch explained it theoritically in\
January 1939. ')
        r31 = Student('Isaac', 'Mititi', 'i.mititi@example.com', 'password', 1)
        r32 = Student('Iniko', 'Ekeng', 'i.ekeng@example.com', 'password', 2)
        r33 = Student('Titi', 'Shogbola', 'titi.shogbola@example.com', 'password', 3)
        r34 = Student('Ekarika', 'Nsemeke', 'e.nsemeke@example.com', 'password', 4)
        r35 = Student('David', 'Adeleke', 'd.adele@example.com', 'password', 5)
        
        db.session.add_all([r, r1, r2, r3, r4, r5, r6, r7, r8, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21,  r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35])
        db.session.commit()
        # db.session.add([r3, r4, r5, r6, r7]) # r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35])
        # db.session.commit()'''
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
Provide concise answers to their prompts, giving detailed examples where necessary to buttress a point, \
and referrals to study materials that may help improve their learning. 
'''