import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";

function HomePage() {
  const history = useHistory();

  const goToLoginPage = () => {
      history.push("/login")
  }

  const goToRegisterPage = () => {
      history.push("/register")
  }

  return (
        <BaseContainer className="login form">
        
        <Button  
        width="100%"
        align="center"
        onClick={() => goToRegisterPage()}
        >
        Register
        </Button>

        <br></br>
        <br></br>
        <Button
        width="100%"
        onClick={() => goToLoginPage()}
        >
        Login
        </Button>

        </BaseContainer>
  );
}

export default HomePage