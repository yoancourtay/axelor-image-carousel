import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

export default class AxelorCarousel extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            pictures: [],
            id: null,
            
            mainDomain: 'com.axelor.photoalbum.db.Album',
            subDomain: 'com.axelor.photoalbum.db.Photo',
            subDomFieldName : 'photoList',
            
            axelorAppName: 'pizza-planet',
            paramName: 'albumId',
            domToSubDomField: [
                {
                    domain: 'com.axelor.photoalbum.db.Album',
                    field: 'photoList'
                },
                {
                    domain: 'com.axelor.photoalbum.db.Photo',
                    field: 'picture'
                }
            ]
        }
        
        this.getPictures = this.getPictures.bind(this)
    }

    getPictures () {
        const params = new URLSearchParams(document.location.search)
        this.setState({id: params.get(this.state.paramName)}, async () => {
            if (this.state.id) {

                for (const group of this.state.domToSubDomField) {
                    //Go through domains
                    //TODO check if field is array and go through it
                    await fetch(`/${this.state.axelorAppName}/ws/rest/${group.domain}/${this.state.id}/`, {method: 'GET'})
                    .then(response => response.json())
                    .then(json => {
                        if (group.field) {
                            console.log("Still more fields")
                            console.log("Length: " + json.data[0][group.field].length)
                            //TODO if length, go into for(to) mode
                            console.log("Previous ID: " + this.state.id)
                            this.setState({id: json.data[0][group.field].id}, () => console.log("New ID: " + this.state.id))
                            console.log(json.data[0][group.field])
                        } else {
                            console.log("No more fields")
                            console.log(json.data[0])
                        }                        
                    })
                    .catch(err => console.error(err))
                }
                
                
                // fetch(`/${this.state.axelorAppName}/ws/rest/${this.state.mainDomain}/${id}/`, {method: 'GET'})
                // .then(response => response.json())
                // .then(json => {
                //     json.data[0][this.state.subDomFieldName].forEach(subDomain => {                                       
                //         fetch(`/${this.state.axelorAppName}/ws/rest/${this.state.subDomain}/${subDomain.id}/`, {method: 'GET'})
                //         .then(response => response.json())
                //         .then(json => this.setState(prevState => {
                //             return {
                //                 pictures: [
                //                 ...prevState.pictures, 
                //                 `/${this.state.axelorAppName}/ws/rest/com.axelor.meta.db.MetaFile/${json.data[0].picture.id}/content/download`
                //             ]
                //             }
                //         }))
                //         .catch(err => console.error(err))
                //     });
                // })
                // .catch(err => console.error(err))
            }
        })
    }

    componentDidMount() { 
        this.getPictures()
    }
  
    render() {
        const pictureList = this.state.pictures.map(picture => {
            return(
                picture && <div><img src={picture}/></div>
            )
        })

        return (
            <Carousel
                autoPlay={true}
                dynamicHeight={false}
                infiniteLoop={true}
                width="50%">
                    {pictureList}
            </Carousel>
        )
    }
}
