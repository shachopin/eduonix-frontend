export const registerNewUserAPI = async (payload) => {
    try {
        const response = await fetch("http://localhost:3001/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...payload
            })
        });
        const { data, success, message = "" } = await response.json();
        if (success) {
            return Promise.resolve({
                success,
                data
            })
        }
        return Promise.reject({
            success: false,
            message
        })
    } catch (error) {
        console.error(error, "error occured in registerNewUserAPI");
        return Promise.reject({
            success: false,
            error: error.message,
            data: null
        })
    }

}
export const validateUserLogin = async ({ email, password }) => {
    try {
        const response = await fetch(`http://localhost:3001/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const { success, data } = await response.json();
        if (success) {
            return {
                success: true,
                data
            };
        }
        return {
            success: false,
            data: null
        }
    } catch (error) {
        console.error(error);
        return Promise.reject({
            success: false,
            data: null
        });
    }
}

export const fetchBookingsByUserId = async (user_id) => {
    try {
        const response = await fetch(`http://localhost:3001/users/my-appointments/${user_id}`);
        const { success, data } = await response.json();
        if (success) {
            return {
                success: true,
                data
            };
        }
        return {
            success: false,
            data: null
        }
    } catch (error) {
        console.error(error);
    }
}

export const fetchAllHospitals = async () => {
    try {
        const response = await fetch('http://localhost:3001/hospital/all-hospitals');
        const { success, data } = await response.json();
        if (success) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            data: null
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error)
    }
}

export const createNewAppointment = async (payload) => {
    try {
        const response = await fetch('http://localhost:3001/appointment/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...payload
            })
        });
        const { success, data, message = "" } = await response.json();
        if (success) {
            return Promise.resolve({
                success,
                data
            })
        }
        return Promise.reject({
            success: false,
            message
        })
    } catch (error) {

    }
}