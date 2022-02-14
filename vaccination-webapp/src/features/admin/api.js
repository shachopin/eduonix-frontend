export const fetchAllBookings=async()=>{
        try {
            const response = await fetch(`http://localhost:3001/bookings`);
            const data = await response.json();
            if (data.length > 0) {
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
export const validateAdminLogin = async (payload) => {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${payload.email}&password=${payload.password}&role=admin`);
        const data = await response.json();
        if (data.length > 0) {
            return {
                success: true,
                data: data[0]
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