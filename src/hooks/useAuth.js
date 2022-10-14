import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export default function AuthProvider(props) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        if (!user) {
            if (!window.localStorage.getItem("JWT")) {
                setIsLoading(false)
                return
            }
            if (window.localStorage.getItem("user")) {
                setUser(JSON.parse(window.localStorage.getItem("user")))
                setIsLoading(false)
                return
            }
            axios.get("http://localhost:80/api/index.php", {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
                },
                params: {
                    type: "fetch-session"
                }
            }).then((response) => {
                if (response.status === 200) {
                    if (response.data["jwt-validate"]) {
                        setUser(response.data["user"])
                        window.localStorage.setItem("user", JSON.stringify(response.data["user"]))
                    }
                }
            })
        }
        setIsLoading(false)
    }, [user])

    const logout = () => {
        window.localStorage.removeItem("JWT")
        window.localStorage.removeItem("user")
        setUser(null)
    }

    const values = {
        user,
        setUser,
        logout
    }

    return (<UserContext.Provider value={values}>{!isLoading && props?.children}</UserContext.Provider>);
}