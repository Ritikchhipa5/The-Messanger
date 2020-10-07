import React, { Component } from "react";
// import { ChatList } from "react-chat-elements";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";

class ChatUserList extends Component {
    state = {}

    searchInput(e) {

    }
    render() {
        return (
            <div>
                <FormGroup>
                    <FormControl
                        type="text"
                        placeholder="Search user here..."
                        onInput={this.searchInput.bind(this)}
                    />
                </FormGroup>
                
            </div>
        );
    }
}

export default ChatUserList;