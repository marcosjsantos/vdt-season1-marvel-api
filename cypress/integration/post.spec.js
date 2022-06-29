

describe('POST /characters', function () {

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda maximoff',
            age: 28,
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character).then(function (response) {
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context('Quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'Vingadores da costa oeste',
                'Irmandade de mutantes'
            ],
            active: false
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('Não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    it.only('Não deve cadastrar um personagem com campos obrigatorios em branco', function () {

        const character = {
            name: '',
            age: 39,
            alias: '',
            team: [''],
            active: true
        }

        cy.postCharacter(character).then(function (response) {
            expect(response.status).to.equal(400)
            expect(response.body.validation.body.message).to.eql('"name" is not allowed to be empty')
        })
    })
})