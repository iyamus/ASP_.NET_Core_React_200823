//rafc 하면 자동으로 구조 생성됨

import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";


export const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            width={60}
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={activityStore.openCreateForm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
