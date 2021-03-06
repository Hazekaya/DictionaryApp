import React from 'react';
import {StyleSheet, View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import {Button, TextInput, Appbar} from 'react-native-paper';
import axios from 'axios';

export default class EntryPage extends React.Component {
    state = {
        searchTerm: 'Enter a word!',
        imageStatus: require('../assets/images/cartoonIcons/samurai.png'),
    };

    searchDefinition = () => {
        let searchTerm = this.state.searchTerm;

        if (searchTerm === null) {
            alert('Please enter a word!');
        } else {

            //fetch result...
            this.setState({
                search: searchTerm,
            });

            //API call
            axios.get('https://jisho.org/api/v1/search/words?keyword=' + searchTerm.toLowerCase())
                .then(res => {
                    try {
                        let word = JSON.stringify(res.data.data[0].japanese[0].word);
                        let reading = JSON.stringify(res.data.data[0].japanese[0].reading);

                        if (word === undefined) {

                            reading = reading.replace(/"/g, "");

                            this.setState({
                                reading: 'Reading: ' + reading
                            })
                        } else {

                            word = word.replace(/"/g, "");
                            reading = reading.replace(/"/g, "");

                            this.setState({
                                imageStatus: require('../assets/images/background/whiteout.png'),
                                kanji: 'Word: ' + word,
                                reading: 'Reading: ' + reading
                            })

                        }
                    } catch (e) {
                        alert(`We can't find this word in our database!`)
                    }

                })
        }
    };

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Appbar.Header style={styles.appbarHeader}>
                    <Appbar.Content
                        title='Search Kanji'
                        subtitle='Enter a word and press search!'/>
                </Appbar.Header>
                <ScrollView>
                    <View style={styles.searchView}>
                        <Text style={styles.SearchText}>{this.state.search}</Text>
                    </View>
                    <View style={styles.resultView}>

                        <Image source={this.state.imageStatus}
                               style={styles.backgroundImages}/>
                        <Text style={styles.searchResult}>{this.state.kanji}</Text>
                        <Text style={styles.searchResult}>{this.state.reading}</Text>

                        <TextInput style={styles.searchTermInput} value={this.state.searchTerm}
                                   onChangeText={(text) => this.setState({searchTerm: text})}/>

                        <Button style={styles.searchButton} onPress={() => this.searchDefinition()}>Search!</Button>

                    </View>
                </ScrollView>


            </SafeAreaView>
        );
    }
};

//styles
const styles = StyleSheet.create({

    //overall view
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        marginBottom: 0,
        alignSelf: 'stretch',
    },

    //Header
    appbarHeader: {
        backgroundColor: '#3498db',
    },

    //searchView
    searchView: {
        zIndex: 1,
        backgroundColor: '#FEFEFE',
        paddingTop: 2,
        paddingBottom: 2,
    },

    resultView: {
        paddingTop: 15,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignContent: 'stretch',
    },

    backgroundImages: {
        flexWrap: 'nowrap',
        marginTop: -55,
        marginLeft: 67,
        zIndex: -2,
        width: 270,
        height: 100 + '%',
        position: 'absolute',
    },


    //Search button
    searchButton: {
        backgroundColor: '#3498db',
        height: 40,
    },

    SearchText: {
        backgroundColor: '#FEFEFE',
        borderLeftWidth: 5,
        borderBottomWidth: 5,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderRadius: 100,
        borderColor: '#3498db',
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10,
        paddingTop: 50,
        paddingBottom: 100,
        alignContent: 'center',
    },

    searchResult: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: -33,
        paddingBottom: 75
    },

    searchTermInput: {
        paddingBottom: 30,
        textAlign: 'center'
    },


});