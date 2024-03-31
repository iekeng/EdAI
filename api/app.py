import os
from openai import OpenAI
from flask import request, jsonify
from flask_praetorian import auth_required, current_user
from dotenv import load_dotenv, find_dotenv
from . import *

load_dotenv(find_dotenv()) 
app = create_app()
api_key = os.environ['OPENAI_API_KEY']
client = OpenAI(
    api_key=api_key
)

@main.post('/auth/login', strict_slashes=False)
def login():
    email = request.json['email']
    password = request.json['password']
    student = guard.authenticate(email, password)
    result = {'access_token': guard.encode_jwt_token(student)}
    return result

@main.post('/auth/refresh', strict_slashes=False)
def refresh():
    old_token = request.json['something']
    new_token = guard.refresh_jwt_token(old_token)
    result = {'access_token': new_token}
    return result


@main.post('/chatbot', strict_slashes=False)
@auth_required
def chatbot(model="gpt-3.5-turbo"):
    email = current_user().email
    student = Student.query.filter_by(email=email).first()
    student_id = student.id

    messages = [
        {"role": "system", "content": system_message}
    ]
    prompt = request.json['prompt']

    message_prompt = Message(prompt, student_id)

    new_message = {"role": "user", "content": prompt}
    messages.append(new_message)

    response = client.chat.completions.create(
        model=model,
        messages=messages
    )
    result = response.choices[0].message.content

    message_result = Message(result, student_id)

    db.session.add_all([message_prompt, message_result])
    db.session.commit()
    
    return jsonify({"message": result})

@main.get('/chats', strict_slashes=False)
@auth_required
def get_messages():
    email = current_user().email
    student = Student.query.filter_by(email=email).first()
    student_id = student.id
    messages = Message.query.filter_by(student_id=student_id).all()
    result = [(message.value) for message in messages]
    return jsonify({'messages': result})


@main.route('/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    all_regions = [{'id': region.id, 'name': region.name} for region in regions]
    return jsonify(all_regions)

@main.route('/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    if request.method == 'POST':
        name = request.json['name']
        if Region.query.get(id):
            return jsonify({'error': 'id already in use'}), 409
        new_region = Region(name=name)

        db.session.add(new_region)
        db.session.commit()

        return jsonify({'id': new_region.id, 'name': new_region.name})
    
    region = Region.query.get(id)
    if region is None:
        return jsonify({'error': 'Region not found.'}), 404
    return jsonify({'id': region.id,
                    'name': region.name}), 200


@main.get('/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    if countries is None:
        return jsonify({'error': 'Countries not found'}), 404
    countries_list = [{'id': country.id, 'name': country.name} for country in countries]
    return jsonify(countries_list), 200

@main.route('/country/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
def get_country(id):
    if request.method=='POST':
        name = request.json['name']
        id = request.json['id']
        if Country.query.get(id):
            return jsonify({'error': 'id already in use'}), 409
        new_country = Country(name=name)

        db.session.add(new_country)
        db.session.commit()
        
    country = Country.query.get(id)
    if country is None:
        return jsonify({'error': 'Country not found'}), 404
    return jsonify({'id': country.id, 'name': country.name}), 200

@main.get('user/country', strict_slashes=False)
@auth_required
def get_user_country():
    email = current_user().email
    student = Student.query.filter_by(email=email).first()
    curriculum_id = student.curriculum_id
    curriculum = Curriculum.query.get(curriculum_id)
    country_id = curriculum.country_id
    country = Country.query.get(country_id)

    return jsonify({'country': country.name}), 200

@main.get('user/curriculum', strict_slashes=False)
@auth_required
def get_user_curriculum():
    email = current_user().email
    student = Student.query.filter_by(email=email).first()
    curriculum_id = student.curriculum_id
    curriculum = Curriculum.query.get(curriculum_id)

    return jsonify({'curriculum': curriculum.name}), 200

@main.get('user/profile', strict_slashes=False)
@auth_required
def get_user_profile():
    email = current_user().email
    student = Student.query.filter_by(email=email).first()

    return jsonify({'firstname': student.firstname, 'lastname': student.lastname}), 200

@main.get('user/subjects', strict_slashes=False)
@auth_required
def get_user_subjects():
    email = current_user().email
    student = Student.query.filter_by(email=email).first()
    curriculum_id = student.curriculum_id
    subjects = Subject.query.filter_by(curriculum_id=curriculum_id).all()
    
    result = [{'subject': subject.name, 'id': subject.id} for subject in subjects]

    return jsonify(result)

@main.get('/subject/<int:id>/topics', strict_slashes=False)
@auth_required
def get_user_topics(id):
    subject = Subject.query.get(id)
    subject_id = subject.id
    topics = Topic.query.filter_by(subject_id=subject_id).all()
    result = [{'topic': topic.name, 'id': topic.id} for topic in topics]

    return jsonify(result)

@main.get('/topic/<int:id>/content', strict_slashes=False)
@auth_required
def get_user_content(id):
    topic = Topic.query.get(id)
    result = {'content': topic.content} 

    return jsonify(result)

@main.route('/profiles', strict_slashes=False)
def get_students_profile():
    students = Student.query.all()
    curriculums = Curriculum.query.all()
    if students is None:
        return jsonify({'error': 'Students not found'}), 404
    result = []
    for student in students:
        for curriculum in curriculums:
            if student.curriculum_id == curriculum.id:
                result.append({'id': student.id, 
               'firstname': student.firstname, 
               'lastname': student.lastname,
               'email': student.email, 
               'curriculum': curriculum.name})
    return jsonify(result), 200

@main.get('/profile/<int:id>', strict_slashes=False)
def student_profile(id):
    student = Student.query.get(id)
    if student is None:
        return jsonify({'error': 'Student not found'}), 404
    curriculum = Curriculum.query.filter_by(id=student.curriculum_id).first()
    country = Country.query.filter_by(id=curriculum.country_id).first()
   
    return jsonify({'firstname': student.firstname, 
                    'lastname': student.lastname, 
                    'email': student.email,
                    'curriculum': curriculum.name,
                    'country': country.name}), 200

@main.post('/post/profile')
def new_student():
    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    email = request.json["email"]
    password = request.json["password"]
    curriculum_id = request.json["curriculum_id"]

    new_student = Student(firstname, lastname, email, guard.hash_password(password), curriculum_id)

    db.session.add(new_student)
    db.session.commit()

    return jsonify({'firstname': new_student.firstname, 
                    'lastname': new_student.lastname, 
                    'email': new_student.email, 
                    'curriculum_id': new_student.curriculum_id}), 200

@main.put('/profile/edit/<int:id>', strict_slashes=False)
def post_student(id):
    try:
        student = Student.query.get(id)

        firstname = request.json["firstname"]
        lastname = request.json["lastname"]
        email = request.json["email"]

        student.firstname = firstname
        student.lastname = lastname
        student.email = email
        
        return jsonify({'firstname': student.firstname, 
                        'lastname': student.lastname, 
                        'email': student.email}), 200
    except Exception as e:
        return e.message

@main.get('/curriculums', strict_slashes=False)
def get_curriculums():
    curriculums = Curriculum.query.all()
    countries = Country.query.all()
    curriculum_list = []
    for country in countries:
        for curriculum in curriculums:
            if country.id == curriculum.country_id:
                curriculum_list.append({'id': curriculum.id,
                                    'country': country.name,
                                    'curriculum': curriculum.name})
    return jsonify(curriculum_list)

@main.get('/country/<int:id>/curriculums', strict_slashes=False)
def get_curriculums_by_country(id):
    country = Country.query.get(id)
    result = [{'id': curriculum.id, 'curriculum': curriculum.name } for curriculum in country.curriculums]
    return jsonify(result)

@main.get('/country/<int:id>/curriculum/<int:num>', strict_slashes=False)
def get_curriculum_by_country(id, num):
    country = Country.query.get(id)
    for curriculum in country.curriculums:
        if curriculum.id == num:
            result = {'id': curriculum.id, 'curriculum': curriculum.name } 
    return jsonify(result)

@main.get('/country/<int:id>/curriculum/<int:num>/subjects', strict_slashes=False)
def get_curriculum_subjects(id, num):
    curriculum = Curriculum.query.get(num)
    if curriculum.country_id != id:
        return jsonify({'error': 'Curriculum not specified'}), 404
    subjects = Subject.query.filter_by(curriculum_id=num).all()
    all_subjects = [{'id': subject.id, 
                     'name': subject.name} 
                     for subject in subjects]
    return jsonify(all_subjects), 200

@main.get('/curriculum/<int:id>', strict_slashes=False)
def get_curriculum(id):
    curriculum = Curriculum.query.get(id)
    if curriculum is None:
        return jsonify({'error': 'Curriculum not found'}), 404
    country = Country.query.filter_by(id=curriculum.country_id).first()
    return jsonify({'id': curriculum.id, 
                    'curriculum': curriculum.name,
                    'country': country.name})

@app.get('/country/<int:id>/curriculum/<int:num>/subject/<int:var>/topics', strict_slashes=False)
def get_topics(id, num, var):
    country = Country.query.get(id)
    curriculum = Curriculum.query.get(num)
    subject = Subject.query.get(var)

    if curriculum in country.curriculums:
        if subject in curriculum.subjects:
            topics = [{'id': topic.id, 
            'topic': topic.name, 
            'content': topic.content}for topic in subject.topics]
            return jsonify(topics)
    return {'error': 'Subject not specified'}, 404

app.register_blueprint(main, url_prefix='/api')
