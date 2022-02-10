import React, { Component } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View, SafeAreaView, SectionList, StatusBar } from "react-native";
import { Box, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Tooltip, Checkbox, Badge } from "native-base";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  componentDidMount = () => {
    fetch("https://opensheet.elk.sh/1DjrkLokL7ODiY4FZH1hvlc91yi-NbOT90Jtz5furBgo/Movies", {
      "method": "GET",

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Mount", responseJson[0].Category);
        this.setState({ data: responseJson });
        console.log("state check", this.state.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container} href={data.item.URL}>
      {/* <Image style={styles.image} source={{ uri: data.item.url }} /> */}

      {/* <Text style={styles.title}>{data.item.URL}</Text> */}
      <Tooltip label={data.item.Desc} openDelay={300}>
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2">
          <HStack space={3} justifyContent="space-between">

            <VStack>
              <Text
                fontSize="lg"
                _dark={{
                  color: 'blue.300',
                }}
                color="blue.800"
                bold>
                {data.item.URL}
              </Text>
              <Text
                color="blue.600"
              >
                {data.item.Category}
              </Text>
            </VStack>

            <Spacer />
            {/* <Checkbox value="test" isChecked={data.item.Online=='TRUE' ? true : false}>Online </Checkbox> */}
            <VStack alignSelf="center">
              {data.item.Online == 'TRUE' ? <Badge colorScheme="success">Online</Badge> : null}
              {data.item.Download == 'TRUE' ? <Badge colorScheme="info" >Download</Badge> : null}
            </VStack>

          </HStack>

        </Box>
      </Tooltip>
    </TouchableOpacity>

  ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }}
  />
  render() {
    // console.log("Mount",responseJson[0].Category);
    return (
      <SafeAreaView>
        <NativeBaseProvider>
          <Heading color="blue.600"><Center>Movie Sites</Center></Heading>

          <FlatList
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item.id.toString()}

          />
        </NativeBaseProvider>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    color: "#000",
    fontSize: 24
  }
});

export default App;