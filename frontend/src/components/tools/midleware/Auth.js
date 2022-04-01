import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/Auth";

const Auth = (props) => {
    const [login, setLogin] = useRecoilState(authenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!login.auth) {
            navigate('/admin/login');
        }
    }, [])

    return props.children;
}

export default Auth