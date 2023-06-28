from flask_marshmallow import Marshmallow
ma = Marshmallow()

class RegionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


region_schema = RegionSchema()
regions_schema = RegionSchema(many=True)        

class StudentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname', 'email', 'region_id')

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)     

class CountrySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'zone')

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

class CurriculumSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')
    
curriculum_schema = CurriculumSchema
curriculums_schema = CurriculumSchema(many=True)

class SubjectSchema(ma.Schema):
    class Meta:
        fields = ('id', 'subject_id', 'name', 'content')

subject_schema = SubjectSchema()
subjects_schema = SubjectSchema(many=True)
