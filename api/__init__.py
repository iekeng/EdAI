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
 
    # from .auth import auth as auth_blueprint
    # app.register_blueprint(auth_blueprint)

    # from .api import api as api_blueprint    
    # app.register_blueprint(api_blueprint)

    with app.app_context():
        guard.init_app(app, Student)
        ''' db.create_all()
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
        r40 = Topic('The Structure of the Atom', 4, "The understanding of the atom's \
structure has been critical in explaining the behavior of elements, chemical \
bonding, and the interactions between atoms that govern the properties of matter. \
The modern quantum mechanical model provides the most accurate description of the \
atom's structure and behavior, incorporating principles from quantum mechanics to \
explain the behavior of subatomic particles.")
        r41 = Topic('Chemical Bonding', 4, "Chemical bonding is the process by which atoms combine to form molecules or compounds. \
Atoms are held together in molecules through various types of chemical bonds, which \
involve the sharing, transfer, or attraction of electrons. Understanding chemical bonding \
is fundamental to understanding the properties and behavior of matter.\
Chemical bonding determines the structure, properties, and reactivity of substances. \
It is the basis for understanding how atoms come together to form a wide variety of \
molecules, ranging from simple diatomic gases to complex biomolecules. The concept of \
chemical bonding is central to many branches of chemistry, including organic chemistry, \
inorganic chemistry, and materials science.")
        r42 = Topic('States of Matter', 4, "States of matter refer to the different physical forms that matter can exist in, based \
on the arrangement and behavior of its constituent particles. There are primarily four \
states of matter: solids, liquids, gases, and plasma. The transition \
between these states is governed by changes in temperature and pressure.\
In addition to these four main states, other exotic states of matter can exist under \
extreme conditions, such as Bose-Einstein condensates and quark-gluon plasma. \
Understanding the states of matter is crucial in various scientific fields, including \
physics, chemistry, and engineering, as it helps explain the behavior of materials \
under different conditions and has practical applications in diverse industries")
        r43 = Topic('Solutions and Mixtures', 4, "Solutions and mixtures are both types of \
combinations of different substances, but they have distinct characteristics and \
behaviors.'A solution is a homogeneous mixture in which one or more substances, called \
solutes, are uniformly distributed in another substance, known as the solvent. Solutions \
can be in any state of matter (solid, liquid, or gas), but the most common examples are \
liquid solutions")
        r44 = Topic('Acids, Bases and Salts', 4, "Acids, bases, and salts are three important \
classes of chemical compounds that play significant roles in chemistry and our daily \
lives. Acids are a group of chemical compounds that release hydrogen ions (H+) when \
dissolved in water. They are characterized by their sour taste, ability to turn blue \
litmus paper red, and their capacity to react with certain metals to produce hydrogen gas.")
        r45 = Topic('Redox Reactions', 4, "Redox reactions, short for reduction-oxidation \
reactions, are a class of chemical reactions that involve the transfer of electrons \
between species. These reactions are essential in various natural and industrial processes, and they \
play a crucial role in maintaining the energy balance in living organisms.")
        r31 = Student('Isaac', 'Mititi', 'i.mititi@example.com', guard.hash_password('password'), 1)
        r32 = Student('Iniko', 'Ekeng', 'i.ekeng@example.com', guard.hash_password('password'), 2)
        r33 = Student('Titi', 'Shogbola', 'titi.shogbola@example.com', guard.hash_password('password'), 3)
        r34 = Student('Ekarika', 'Nsemeke', 'e.nsemeke@example.com', guard.hash_password('password'), 4)
        r35 = Student('David', 'Adeleke', 'd.adele@example.com', guard.hash_password('password'), 5)
        r36 = Message('Hi, I am Isaac', 1)
        r37 = Message('Hello Isaac', 1)
        
        db.session.add_all([r, r1, r2, r3, r4, r5, r6, r7, r8, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21,  r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36, r37, r40, r41, r42, r43, r44, r45])
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
Provide concise answers to their prompts, giving detailed examples where necessary to buttress a point. \
If a question is repeated more than thrice, add referrals to study materials that may help improve students' learning. 
'''

