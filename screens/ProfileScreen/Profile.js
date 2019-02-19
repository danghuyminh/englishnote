import React from "react";
import { Container, Content, Thumbnail, Text, Button, Icon, Card, CardItem, Left, Right, Body} from "native-base";
import HeaderDrawer from "../../components/HeaderDrawer";
import Moment from "moment";

export default class Profile extends React.Component {
    componentDidMount() {

    }

    render() {
        const {0: data} = auth.currentUser.providerData;
        return (
            <Container>
                <HeaderDrawer title='Profile' navigation={this.props.navigation}/>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: data.photoURL}} />
                                <Body>
                                <Text>{data.displayName}</Text>
                                <Text note>{data.email}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>{data.synchronizedTimes ? data.synchronizedTimes : 0} times synchronized</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Text>Last login: {new Moment(auth.currentUser.metadata.lastSignInTime).format("dddd, DD MMM YYYY")}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}