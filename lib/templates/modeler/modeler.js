
//import propertiesPanelModule from 'cmmn-js-properties-panel';
//import propertiesProviderModulefrom 'cmmn-js-properties-panel/lib/provider/camunda';
//import camundaModdleDescriptor from 'camunda-cmmn-moddle/resources/camunda';
import _ from 'lodash';
import { Template } from 'meteor/templating';   //just blaze right now
import CmmnModeler from 'cmmn-js/lib/Modeler';
import 'diagram-js/assets/diagram-js.css';      //import the proper css
import 'cmmn-js/assets/cmmn-font/css/cmmn-embedded.css';    //import icon font
import './modeler.html';

let modeler;
let container;
let canvas;


////////////////////////////////////////////////////////////////////////////////

Template.cmmnmodeler.onCreated(function onCreated() {
    //nothing to do here yet
});

Template.cmmnmodeler.onRendered(function onRendered() {
    container = $('#js-drop-zone');
    canvas = $('#js-canvas');
    modeler = new CmmnModeler({container:canvas});
    let downloadLink = $('#js-download-diagram');
    let downloadSvgLink = $('#js-download-svg');

    $('.buttons a').click(function(e) {
        if (!$(this).is('.active')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    let  setEncoded = function(link, name, data) {
        let encodedData = encodeURIComponent(data);
        if (data) {
            link.addClass('active').attr({
                'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                'download': name
            });
        } else {
            link.removeClass('active');
        }
    };

    let exportArtifacts = _.debounce(function() {
        saveSVG(function(err, svg) {
            setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
        });
        saveDiagram(function(err, xml) {
            setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
        });
    }, 500);
    modeler.on('commandStack.changed', exportArtifacts);
});


Template.cmmnmodeler.helpers({
    getModeler(){
        return modeler;
    }
});

Template.cmmnmodeler.events({
    'click #js-create-diagram':function(event, templateInstance){
        event.stopPropagation();
        event.preventDefault();
        createNewDiagram();
    },
});

////////////////////////////////////////////////////////////////////////////////

//  CREATE / IMPORT

function createNewDiagram() {
    $.get('/packages/jkuester_cmmntools/lib/resources/newDiagram.cmmn', openDiagram);
}

function openDiagram(xml) {

      modeler.importXML(xml, function(err) {
            if (err) {
                container
                    .removeClass('with-diagram')
                    .addClass('with-error');
                container.find('.error pre').text(err.message);
                console.error(err);
            } else {
                container
                    .removeClass('with-error')
                    .addClass('with-diagram');
            }
      });
}

////////////////////////////////////////////////////////////////////////////////

//  EXPORT

function saveSVG(done) {
    modeler.saveSVG(done);
}

function saveDiagram(done) {
    modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
    });
}

////////////////////////////////////////////////////////////////////////////////
