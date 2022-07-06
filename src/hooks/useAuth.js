import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


export default function useAuth() {
    const { user, setUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        if (!window.localStorage.getItem("JWT")) {
            setIsLoading(false)
            return
        }
        if (window.localStorage.getItem("user")) {
            setUser(JSON.parse(window.localStorage.getItem("user")))
            setIsLoading(false)
            return
        }
        if (!user) {
            axios.get("http://localhost:80/api/index.php", {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
                },
                params: {
                    type: "fetch-session"
                }
            }).then((response) => {
                if (response.status == 200) {
                    if (response.data["jwt-validate"]) {
                        setUser(response.data["user"])
                        window.localStorage.setItem("user", JSON.stringify(response.data["user"]))
                    }
                }
            })
        }
        setIsLoading(false)
    }, [])

    const logout = () => {
        window.localStorage.removeItem("JWT")
        window.localStorage.removeItem("user")
        setUser(null)
    }

    const value = {
        user,
        setUser,
        logout,
        isLoading
    }

    return value
}