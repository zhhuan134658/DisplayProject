<template>
    <div>
        <div id="gos" class="lean"></div>
        <el-button @click="layoutFishbone">layoutFishbone</el-button>
        <el-button @click="layoutBranching">layoutBranching</el-button>
        <el-button @click="layoutNormal">layoutNormal</el-button>
    </div>
</template>
 
<script>
import go from 'gojs';
import { FishboneLayout, FishboneLink } from './FishboneLayout.js';
export default {
    data() {
        return {
            diagram: '',
            json: {
                text: '测试',

                size: 18,
                weight: 'Bold',
                causes: [
                    {
                        text: 'Skills',
                        size: 14,
                        weight: 'Bold',
                        causes: [
                            {
                                text: 'knowledge',
                                weight: 'Bold',
                                causes: []
                            },
                            { text: 'literacy', weight: 'Bold' }
                        ]
                    },
                    {
                        text: 'Procedures',
                        size: 14,
                        weight: 'Bold',
                        causes: [
                            {
                                text: 'manual',
                                weight: 'Bold',
                                causes: [{ text: 'consistency' }]
                            },
                            {
                                text: 'automated',
                                weight: 'Bold',
                                causes: [
                                    { text: 'correctness' },
                                    { text: 'reliability' }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'Communication',
                        size: 14,
                        weight: 'Bold',
                        causes: [
                            { text: 'ambiguity', weight: 'Bold' },
                            {
                                text: 'sales staff',
                                weight: 'Bold',
                                causes: [
                                    {
                                        text: 'order details',
                                        causes: [{ text: 'lack of knowledge' }]
                                    }
                                ]
                            },
                            {
                                text: 'telephone orders',
                                weight: 'Bold',
                                causes: [{ text: 'lack of information' }]
                            },
                            {
                                text: 'picking slips',
                                weight: 'Bold',
                                causes: [
                                    { text: 'details' },
                                    { text: 'legibility' }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'Transport',
                        size: 14,
                        weight: 'Bold',
                        causes: [
                            {
                                text: 'information',
                                weight: 'Bold',
                                causes: [
                                    { text: 'incorrect person' },
                                    {
                                        text: 'incorrect addresses',
                                        causes: [
                                            {
                                                text: 'customer data base',
                                                causes: [
                                                    { text: 'not up-to-date' },
                                                    {
                                                        text: 'incorrect program'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    { text: 'incorrect dept' }
                                ]
                            },
                            {
                                text: 'carriers',
                                weight: 'Bold',
                                causes: [
                                    { text: 'efficiency' },
                                    { text: 'methods' }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    },
    mounted() {
        const $ = go.GraphObject.make;
        let _this = this;
        this.diagram = $(go.Diagram, 'gos', { isReadOnly: false });
        this.diagram.nodeTemplate = $(
            go.Node,
            $(
                go.TextBlock,
                new go.Binding('text'),
                new go.Binding('font', '', _this.convertFont)
            )
        );

        this.diagram.linkTemplateMap.add(
            'normal',
            $(go.Link, { routing: go.Link.Orthogonal, corner: 4 }, $(go.Shape))
        );

        this.diagram.linkTemplateMap.add(
            'fishbone',
            $(
                FishboneLink, // defined above
                $(go.Shape)
            )
        );

        const nodeDataArray = [];
        _this.walkJson(_this.json, nodeDataArray);
        this.diagram.model = new go.TreeModel(nodeDataArray);
        this.layoutFishbone();
    },
    methods: {
        convertFont(data) {
            let size = data.size;
            if (size === undefined) size = 13;
            let weight = data.weight;
            if (weight === undefined) weight = '';
            return weight + ' ' + size + 'px sans-serif';
        },
        walkJson(obj, arr) {
            const key = arr.length;
            obj.key = key;
            arr.push(obj);
            const children = obj.causes;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    const o = children[i];
                    o.parent = key;
                    this.walkJson(o, arr);
                }
            }
        },
        layoutFishbone() {
            this.diagram.startTransaction('fishbone layout');
            this.diagram.linkTemplate =
                this.diagram.linkTemplateMap.getValue('fishbone');
            this.diagram.layout = go.GraphObject.make(FishboneLayout, {
                angle: 180,
                layerSpacing: 10,
                nodeSpacing: 20,
                rowSpacing: 10
            });
            this.diagram.commitTransaction('fishbone layout');
        },
        layoutBranching() {
            this.diagram.startTransaction('branching layout');
            this.diagram.linkTemplate =
                this.diagram.linkTemplateMap.getValue('normal');
            this.diagram.layout = go.GraphObject.make(go.TreeLayout, {
                angle: 180,
                layerSpacing: 20,
                alignment: go.TreeLayout.AlignmentBusBranching
            });
            this.diagram.commitTransaction('branching layout');
        },
        layoutNormal() {
            this.diagram.startTransaction('normal layout');
            this.diagram.linkTemplate =
                this.diagram.linkTemplateMap.getValue('normal');
            this.diagram.layout = go.GraphObject.make(go.TreeLayout, {
                angle: 180,
                breadthLimit: 1000,
                alignment: go.TreeLayout.AlignmentStart
            });
            this.diagram.commitTransaction('normal layout');
        }
    }
};
</script>
 
<style scoped>
.lean {
    height: 500px;
    width: 90%;
    border: 1px solid black;
    background-color: #dae4e4;
}
</style>