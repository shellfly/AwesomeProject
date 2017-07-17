import React, { Component } from "react";
import {
  Picker
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "styles/common";
import fetcher from "utils/fetcher";

const QUOTAS = ["20", "50", "100", "200", "300"];

class QuotaScreen extends Component {
  static navigationOptions = {
    title: "每日任务",
    tabBarLabel: "我",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user-o" size={24} color={tintColor} />
    ),
    headerStyle: {
      backgroundColor: colors.primaryColor,
    },
    headerTintColor: "white",
  };

  constructor(props) {
    super(props);

    const userCourse = this.props.navigation.state.params.userCourse;
    this.state = {
      userCourse,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(quota, index) {
    console.log("change quota", this.state);
    const userCourse = this.state.userCourse;
    userCourse.quota = quota;
    this.setState({ userCourse });
    const setUserCourse = this.props.navigation.state.params.setUserCourse;
    setUserCourse(userCourse);
    fetcher.put(`/course/user_courses/${userCourse.id}/`, { quota });
  }

  render() {
    return (
      <Picker
        selectedValue={`${this.state.userCourse.quota}`}
        onValueChange={(v, i) => this.onChange(v, i)}
      >
        {
          QUOTAS.map((q, i) => <Picker.Item key={q} label={q} value={q} />)
        }
      </Picker>

    );
  }
}

export default QuotaScreen;
