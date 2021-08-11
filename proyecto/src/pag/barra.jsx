import React, {useState} from 'react';
import {Button,Nav,NavItem,NavbarText,ButtonDropdown,DropdownItem,DropdownToggle,DropdownMenu,Container} from 'reactstrap';
function Barra(){
    const toggle = () => setOpen(!dropdownOpen);
    const [dropdownOpen, setOpen] = useState(false);
    return (
        <Container>
        <Nav>
            
            <NavItem>
            <NavbarText>Text</NavbarText>
                <div className="btn-group btn-sm">
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <Button color="primary">Cargar lista</Button>
                    <DropdownToggle split color="primary"/>
                    <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                        <DropdownItem>Item 2</DropdownItem>
                        <DropdownItem>Item 3</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </NavItem>
            <NavItem>
            </NavItem>
        
      </Nav>
      </Container>
    );
  }

export default Barra;