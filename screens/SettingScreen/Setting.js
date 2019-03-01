import React, {PureComponent} from "react";
import {Switch} from 'react-native';
import { Container, Content, Text, ListItem, Left, Button, Icon, Body, Right} from "native-base";
import HeaderDrawer from "../../components/HeaderDrawer";
import {getSettings, updateSetting, updateAutoSync} from "../../redux/actions/SettingAction";
import connect from "react-redux/es/connect/connect";
import Config from "../../config";

class Setting extends PureComponent {

    componentDidMount() {
        this.props.getSettings();
    }

    toggleSwitch = async (value) => {
        this.props.changeAutoSync(value ? '1' : '0');
        await this.props.updateSetting('autoSync', value ? '1' : '0');
    };

    render() {
        const {autoSync} = this.props;

        return (
            <Container>
                <HeaderDrawer title='Settings' navigation={this.props.navigation}/>
                <Content padder>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: Config.themeColor }}>
                                <Icon active name="sync" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Auto synchronize notes</Text>
                        </Body>
                        <Right>
                            <Switch onValueChange={this.toggleSwitch} value={autoSync} />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {autoSync, isFetching} = state.sqliteGetSetting;

    return {
        autoSync: (autoSync !== '0'),
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getSettings: () => dispatch(getSettings()),
        updateSetting: (name, value) => dispatch(updateSetting(name, value)),
        changeAutoSync: (value) => dispatch(updateAutoSync(value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)