import React from 'react';
import {StyleSheet, View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import {Button, TextInput, Appbar} from 'react-native-paper';
import axios from 'axios';

export default class EntryPage extends React.Component {
    state = {
        searchTerm: 'Enter a word!',
        result: 'Result!',
        imageStatus: require('../assets/images/cartoonIcons/samurai.png'),
    };

    searchDefinition = () => {
        let searchTerm = this.state.searchTerm;

        if (!searchTerm.match(/[\u4e00-\u9faf]/)) {
            alert('Please enter a kanji!')
        } else {
            //fetch result...
            this.setState({
                searchTermTwo: searchTerm,
            });

            //API call
            // axios.get('https://jisho.org/api/v1/search/words?keyword=' + searchTerm)
            //     .then(res => {
            //
            //         let result = JSON.stringify(res.data.data[0].senses[0].english_definitions);
            //         result = result.replace(/"/g, "");
            //         result = result.replace(/\[/g, "");
            //         result = result.replace(/]/g, "");
            //         result = result.replace(/,/g, "\n");
            //
            //         this.setState({
            //             imageStatus: require('../assets/images/background/whiteout.png'),
            //             result: result
            //         })
            //     })
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Appbar.Header style={styles.headerStyle}>
                    <Appbar.Content
                        title='Definitions'
                        subtitle='Enter a kanji and press search!'/>
                </Appbar.Header>
                <ScrollView>
                    <View style={styles.searchView}>
                        <Text style={styles.searchText}>{this.state.searchTermTwo}</Text>
                    </View>
                    <View>

                        <Text style={styles.styleResult}>{this.state.result}</Text>

                        <TextInput style={styles.styleInput} value={this.state.searchTerm}
                                   onChangeText={(text) => this.setState({searchTerm: text})}/>

                        <Button style={styles.styleButton} onPress={() => this.searchDefinition()}>Search!</Button>
                    </View>


                    {/*<View style={styles.searchView}>*/}
                    {/*    <Text style={styles.SearchText}>{this.state.search}</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.resultView}>*/}

                    {/*    <Image source={this.state.imageStatus}*/}
                    {/*           style={styles.backgroundImages}/>*/}
                    {/*    <Text style={styles.searchResult}>{this.state.kanji}</Text>*/}
                    {/*    <Text style={styles.searchResult}>{this.state.reading}</Text>*/}

                    {/*    <TextInput style={styles.searchTermInput} value={this.state.searchTerm}*/}
                    {/*               onChangeText={(text) => this.setState({searchTerm: text})}/>*/}

                    {/*    <Button style={styles.searchButton} onPress={() => this.searchDefinition()}>Search!</Button>*/}

                    {/*</View>*/}
                </ScrollView>
            </SafeAreaView>
        );
    }
};

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ghostwhite',
        marginBottom: 0,
        alignSelf: 'stretch'
    },

    headerStyle: {
        backgroundColor: '#3498db',
        color: 'white',
    },

    styleButton: {
        backgroundColor: '#3498db',
    },

    styleText: {
        backgroundColor: '#223456',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingTop: 50,
        paddingBottom: 30,
    },

    styleResult: {
        backgroundColor: '#123456',
        textAlign: 'center',
        fontSize: 35,
        paddingTop: 50,
        paddingBottom: 30
    },

    styleInput: {
        paddingBottom: 30,
        textAlign: 'center'
    }
});