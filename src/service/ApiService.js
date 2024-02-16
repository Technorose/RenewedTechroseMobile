import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://techrosewebapp.azurewebsites.net/"

const getToken = async () => AsyncStorage.getItem('token')

export default class ApiService {

    static async login(loginData = null) {
        let returnData = null;
        await fetch(baseURL + 'UserLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async register(registerData = null) {
        let returnData = null;
        await fetch(baseURL + 'UserCreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async getNutritionsList(limit = 10, offset = 0) {
        let returnData = null;

        const header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken()
        }

        await fetch(baseURL + 'NutritionsList?limit=' + limit + '&offset=' + offset, {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async getNutritionTypeList(limit = 10, offset = 0) {
        let returnData = null;

        const header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken()
        }

        await fetch(baseURL + 'NutritionTypeList?limit=' + limit + "&offset=" + offset , {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async getNutritionBySearch(argument, limit = 10, offset = 0) {
        let returnData = null;

        const header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken()
        }

        await fetch(baseURL + 'NutritionSearch?search_argument=' + argument + '&limit=' + limit + '&offset=' + offset, {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async getMealNamesCodes(take = 10, skip = 0) {
        let returnData = null;

        const header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken()
        }

        await fetch(baseURL + 'MealNamesCodesList?take=' + take + '&skip=' + skip, {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }

    static async getNutritionsByNutritionType(nutritionTypeId, limit = 10, offset = 0) {
        let returnData = null;

        const header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken()
        }

        await fetch(baseURL + 'NutritionListByNutritionType?nutrition_type_id=' + nutritionTypeId + '&limit=' + limit + '&offset=' + offset, {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        })

        return returnData;
    }
}