import { Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function Login () {
    return (
        <View>
            <Text>Login</Text>

            <TextInput placeholder='Email' />

            <TextInput placeholder='Password' />

            <TouchableOpacity>
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}