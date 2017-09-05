module.exports = {
	"assetID": "f579fdf3-3bae-4cbe-b47a-78a30eda6f9b",
	"assetTitle": "CMS Sync Microservice",
	"assetType": "Offering",
	"assetDefaultImage": "https://my3.digitalexperience.ibm.com/api/44ecf1d9-b58c-482c-9eed-2b8b72103240/delivery/v1/resources/dd6243ef4325a29f7f0554682319f400",
	"assetCardImage": "https://my3.digitalexperience.ibm.com/api/44ecf1d9-b58c-482c-9eed-2b8b72103240/delivery/v1/resources/dd6243ef4325a29f7f0554682319f400?resize=400px:235px&crop=400:200;0,17",
	"assetPageImage": "https://my3.digitalexperience.ibm.com/api/44ecf1d9-b58c-482c-9eed-2b8b72103240/delivery/v1/resources/dd6243ef4325a29f7f0554682319f400?resize=1350px:792px&crop=1350:300;0,134",
	"assetOneLiner": "This microservice extends Watson Content Hub (WCH) to integrate it into streaming architectures",
	"assetDescription": "The Sync Microservice extends WCH's abilities by using serverless frameworks to enable WCH to receive data records from streaming services with elastic infrastructure. The microservice also detects when CMS users make changes in WCH, and then send these to an endpoint. These two data flows are handled automatically so that the only interface the CMS users have with the stream, and the endpoint, is WCH. The data is received via elastic distributed infrastructure to ensure that no data records are lost from the data velocity coming from the stream. Records are processed synchronously so as to not overload WCH (given that WCH has maximum api calls per minute that it has to adhere to so as not to overload the infrastructure). ",
	"assetContributors": [
	  {
	    "name": "Brian Balagot",
	    "role": "Solution Architect, Back End Developer",
	    "email": "brian.balagot@ibm.com"
	  },
	  {
	    "name": "Jesse White",
	    "role": "Business Analyst",
	    "email": "jessewhite@us.ibm.com"
	  },
	  {
	    "name": "Lisa Tomita",
	    "role": "WCH SME, WCH Developer",
	    "email": "tomato@us.ibm.com"
	  }
	],
	"industries": [
	  "Media and Entertainment"
	],
	"technologies": [
	  "Python",
	  "Requests",
	  "AWS Lambda",
	  "AWS SQS",
	  "AWS EC2",
	  "AWS RDS",
	  "PostgreSQL",
	  "Watson Content Hub"
	],
	"clients": [
	  "Live Nation"
	],
	artifacts: [
		{
      "type": "Demo Video",
      "title": "CMS Sync Microservice Knowledge Transfer Presentation",
      "description": "As there is no UI for the microservice, no video is available and thus the architecture on slide 8 should suffice",
      "url": "https://ibm.box.com/s/5rutymkwqto6upttjtvc4aeok2m4guqm"
    },
    {
      "type": "Asset Code",
      "title": "CMS Sync Microservice Knowledge Transfer Presentation",
      "description": "As this microservice has not yet been repurposed into a generalizable offering, the code cannot be shown as it is client specific",
      "url": "https://ibm.box.com/s/5rutymkwqto6upttjtvc4aeok2m4guqm"
    },
    {
     "type": "Use Cases",
     "title": "CMS Sync Microservice Knowledge Transfer Presentation",
     "description": "There is volumetric information on slide 7, which gives an idea of the data volumes, sizes that were done with Live Nation",
     "url": "https://ibm.box.com/s/5rutymkwqto6upttjtvc4aeok2m4guqm"
    },
    {
     "type": "Asset Architecture",
     "title": "CMS Sync Microservice Knowledge Transfer Presentation",
     "description": "The architecture used for Live Nation is on slide 8; if this were to be moved to Bluemix then the components would include Openwhisk, IBM Streaming Analytics, IBM Message Hub, Softlayer VM's, and Compose Postgres",
     "url": "https://ibm.box.com/s/5rutymkwqto6upttjtvc4aeok2m4guqm"
    },
    {
     "type": "Asset Implementation Plan",
     "title": "CMS Sync Microservice Implementation Timeline",
     "description": "This project is a 6 week project which would include at the very least a backend developer, a business analyst, and a WCH SME to guide the project team on how WCH works and performance information on it, as well as configuring WCH",
     "url": "https://ibm.box.com/s/hz8lvd7hbih5jiarc8vubakra5a417pc"
     }   
	]
}