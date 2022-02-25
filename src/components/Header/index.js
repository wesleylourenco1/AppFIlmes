import react from "react";

import { Feather } from "@expo/vector-icons";

import { Container, MenuButton, Tittle } from "./styles";
import { useNavigation } from '@react-navigation/native';
function Header({title}) {

    const navgation = useNavigation();

    return (
        <Container>
            <MenuButton onPress={() => navgation.openDrawer()}>
                <Feather
                    name="menu"
                    size={36}
                    color="#fff"
                >
                </Feather>
            </MenuButton >
            <Tittle>{title}</Tittle>
            
        </Container >
    )
}

export default Header;