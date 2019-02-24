import React from "react";
import { Container, Content, Text, ListItem, Left, Button, Icon, Body, Right, Switch} from "native-base";
import HeaderDrawer from "../../components/HeaderDrawer";
import {getSettings, updateSetting} from "../../redux/actions/SettingAction";
import connect from "react-redux/es/connect/connect";
import Config from "../../config";
import {SettingService} from "../../services/SettingService";

class Setting extends React.Component {

    componentDidMount() {
        this.props.getSettings();
    }

    toggleSwitch = (value) => {
        this.props.updateSetting('autoSync', value ? '1' : '0');
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
    const {settings, isFetching} = state.sqliteGetSetting;
    let modifiedSettings = {};
    settings.forEach(setting => {
        modifiedSettings[setting.name] = setting.value;
    });
    const {autoSync} = modifiedSettings;

    return {
        autoSync: (autoSync !== '0'),
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getSettings: () => dispatch(getSettings()),
        updateSetting: (name, value) => dispatch(updateSetting(name, value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)