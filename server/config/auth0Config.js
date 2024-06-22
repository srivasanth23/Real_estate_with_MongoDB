import {auth} from 'express-oauth2-jwt-bearer'


const jwtCheck = auth({
    audience: "http://localhost:8000/",
    issuerBaseURL: `https://dev-knmay4sprlvtcdj2.us.auth0.com`,
    tokenSigningAlg: "RS256"
})

export default jwtCheck

