import { AdditionalContextType } from '@/lib'

/**
 *
 * @param requirement
 * @returns
 */
export const contextPrompt001 = (requirement: string) =>
  `What context do you need to generate a BPMN diagram for a/an ${requirement} process? Provide me an ordered list of items with no additional descriptions as full sentence questions to prompt a user.`

/**
 *
 * @param requirement
 * @returns
 */
export const contextPrompt002 = (requirement: string) =>
  `Based on the requirement "${requirement}", what information do you need to generate a BPMN diagram compliant with the BPMN 2.0 specification? Provide an ordered list of clear, concise, full-sentence questions that will help understand the process flow, participants, tasks, decisions, and their interactions, without any additional descriptions.`

/**
 *
 * @param requirement
 * @param additionalContext
 * @returns
 */
export const diagramPrompt = (
  requirement: string,
  additionalContext: AdditionalContextType[]
) =>
  `Generate a BPMN diagram that is BPMN 2.0 compliant for a/an ${requirement} process. Do not forget to include the BPMNDiagram element. Refer to additional context messages for more information. ${additionalContext}`

/**
 *
 * @param process
 * @returns
 */
export const bpmnPrompt001 = (
  process: string
) => `Generate a BPMN 2.0 XML file that includes a well-structured process definition ${
  process ? `for ${process}` : ''
} along with the required diagram elements to visualize it.
  Refer to prior messages in this chat exchange for additional context regarding the process.
  Follow these instructions:
  1. General Structure:
     - The XML should begin with the <definitions> tag, which includes appropriate namespaces:
       - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
       - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
       - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
       - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
       - Set the targetNamespace attribute appropriately.

  2. Process Definition:
     - Define the process using a <process> element with an id and name.
     - Include elements such as <startEvent>, <userTask>, <serviceTask>, <endEvent>, and <sequenceFlow> to represent the process flow.
     - Ensure each flow element has the required attributes, including id, name, and sourceRef/targetRef for connecting tasks and events.

  3. BPMN Diagram Elements:
     - Add a <bpmndi:BPMNDiagram> directly under <definitions> to represent the graphical layout of the process.
     - Include a <bpmndi:BPMNPlane> with an id and bpmnElement attribute that references the id of the process.

  4. Shapes and Edges:
     - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes (e.g., startEvent, userTask, serviceTask, endEvent):
       - Use the bpmnElement attribute to reference the id of the corresponding BPMN element.
       - Include <omgdc:Bounds> to specify the x, y coordinates, width, and height of the element on the diagram.
     - Use <bpmndi:BPMNEdge> for each sequenceFlow:
       - Reference the id of the sequenceFlow using the bpmnElement attribute.
       - Include <omgdi:waypoint> elements with x and y attributes to define the path between shapes.

  5. Example Structure:
     Below is an example of a simple BPMN XML structure for a document review process, with proper diagram elements:

     <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                  targetNamespace="http://bpmn.example.com/documentreview">

       <process id="document_review" name="Document Review Process">
         <startEvent id="start_event" name="Start Event">
           <outgoing>flow1</outgoing>
         </startEvent>
         <userTask id="review_task" name="Review Document">
           <incoming>flow1</incoming>
           <outgoing>flow2</outgoing>
         </userTask>
         <serviceTask id="notify_task" name="Send Notification">
           <incoming>flow2</incoming>
           <outgoing>flow3</outgoing>
         </serviceTask>
         <endEvent id="end_event" name="End Event">
           <incoming>flow3</incoming>
         </endEvent>
         <sequenceFlow id="flow1" sourceRef="start_event" targetRef="review_task"/>
         <sequenceFlow id="flow2" sourceRef="review_task" targetRef="notify_task"/>
         <sequenceFlow id="flow3" sourceRef="notify_task" targetRef="end_event"/>
       </process>

       <bpmndi:BPMNDiagram id="BPMNDiagram_document_review">
         <bpmndi:BPMNPlane id="BPMNPlane_document_review" bpmnElement="document_review">
           <bpmndi:BPMNShape id="start_event_shape" bpmnElement="start_event">
             <omgdc:Bounds x="100" y="100" width="36" height="36"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="review_task_shape" bpmnElement="review_task">
             <omgdc:Bounds x="200" y="100" width="80" height="60"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="notify_task_shape" bpmnElement="notify_task">
             <omgdc:Bounds x="350" y="100" width="80" height="60"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="end_event_shape" bpmnElement="end_event">
             <omgdc:Bounds x="500" y="100" width="36" height="36"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNEdge id="flow1_edge" bpmnElement="flow1">
             <omgdi:waypoint x="136" y="118"/>
             <omgdi:waypoint x="200" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow2_edge" bpmnElement="flow2">
             <omgdi:waypoint x="280" y="118"/>
             <omgdi:waypoint x="350" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow3_edge" bpmnElement="flow3">
             <omgdi:waypoint x="430" y="118"/>
             <omgdi:waypoint x="500" y="118"/>
           </bpmndi:BPMNEdge>
         </bpmndi:BPMNPlane>
       </bpmndi:BPMNDiagram>
     </definitions>

  6. Notes:
     - Ensure that each BPMNShape and BPMNEdge references a valid BPMN element from the process.
     - The coordinates (x, y) in Bounds and waypoint should be adjusted to properly align elements in the diagram.
     - Validate the XML structure using a BPMN XML schema or a BPMN validation tool to ensure compliance with BPMN 2.0 standards.

  Make sure the generated XML is properly indented and formatted for readability.
  Output only the XML.`

/**
 *
 * @param process
 * @returns
 */
export const bpmnPrompt002 = (
  process: string
) => `Generate a BPMN 2.0 XML file that includes a well-structured process definition ${
  process ? `for ${process}` : ''
} along with the necessary diagram elements to visualize it.
Refer to prior messages in this chat exchange for additional context regarding the process.
The generated XML should adhere to the following detailed instructions to ensure it properly renders the process flow and arrows between elements:

  1. General Structure:
     - Start the XML with a <definitions> tag, including these namespaces:
       - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
       - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
       - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
       - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
     - Include the targetNamespace attribute with an appropriate URI, such as "http://bpmn.example.com/your_process".

  2. Process Definition:
     - Define the process using a <process> element with a unique id and name.
     - The process should include the following elements:
       - <startEvent> for the initiation of the process, with an outgoing sequence flow.
       - <userTask> for user interactions, each with incoming and outgoing sequence flows.
       - <serviceTask> for automated tasks, each with incoming and outgoing sequence flows.
       - <exclusiveGateway> for decision points, each with incoming and multiple outgoing sequence flows.
       - <endEvent> to mark the end of the process, with an incoming sequence flow.
       - <sequenceFlow> elements to define transitions between events and tasks, using sourceRef and targetRef to link them correctly.
     - Ensure each element includes required attributes like id and name and that the sequence flows are properly connected to create a clear process flow.

  3. BPMN Diagram Elements:
     - Include a <bpmndi:BPMNDiagram> element directly under <definitions> to represent the visual layout of the process.
     - Inside the <bpmndi:BPMNDiagram>, add a <bpmndi:BPMNPlane> with id and bpmnElement attributes that reference the id of the defined process.
     - The <bpmndi:BPMNPlane> should contain graphical representations of all flow nodes and connections using <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> elements.

  4. Shapes and Edges:
     - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes such as <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, and <endEvent>:
       - Set the bpmnElement attribute to reference the id of the corresponding BPMN element.
       - Include <omgdc:Bounds> with x, y, width, and height to specify the position and size of each element on the diagram.
     - Use <bpmndi:BPMNEdge> for each <sequenceFlow> to represent the arrows connecting elements:
       - Set the bpmnElement attribute to the id of the sequence flow.
       - Include multiple <omgdi:waypoint> elements with x and y coordinates to define the path and curvature of the arrows between shapes.

  5. Example Structure:
     Below is an example of a more comprehensive BPMN XML structure for a "Loan Application and Approval" process, complete with proper diagram elements to ensure accurate rendering:

     <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                  targetNamespace="http://bpmn.example.com/loanapproval">

       <process id="loan_approval" name="Loan Approval Process">
         <startEvent id="start_event" name="Start Loan Application">
           <outgoing>flow1</outgoing>
         </startEvent>
         <userTask id="submit_application" name="Submit Application">
           <incoming>flow1</incoming>
           <outgoing>flow2</outgoing>
         </userTask>
         <serviceTask id="automated_check" name="Automated Credit Check">
           <incoming>flow2</incoming>
           <outgoing>flow3</outgoing>
         </serviceTask>
         <exclusiveGateway id="gateway_approval" name="Approval Decision">
           <incoming>flow3</incoming>
           <outgoing>flow4</outgoing>
           <outgoing>flow5</outgoing>
         </exclusiveGateway>
         <userTask id="manual_review" name="Manual Review">
           <incoming>flow4</incoming>
           <outgoing>flow6</outgoing>
         </userTask>
         <endEvent id="approved_end" name="Application Approved">
           <incoming>flow6</incoming>
         </endEvent>
         <endEvent id="rejected_end" name="Application Rejected">
           <incoming>flow5</incoming>
         </endEvent>
         <sequenceFlow id="flow1" sourceRef="start_event" targetRef="submit_application"/>
         <sequenceFlow id="flow2" sourceRef="submit_application" targetRef="automated_check"/>
         <sequenceFlow id="flow3" sourceRef="automated_check" targetRef="gateway_approval"/>
         <sequenceFlow id="flow4" sourceRef="gateway_approval" targetRef="manual_review" name="Requires Manual Review"/>
         <sequenceFlow id="flow5" sourceRef="gateway_approval" targetRef="rejected_end" name="Auto Reject"/>
         <sequenceFlow id="flow6" sourceRef="manual_review" targetRef="approved_end"/>
       </process>

       <bpmndi:BPMNDiagram id="BPMNDiagram_loan_approval">
         <bpmndi:BPMNPlane id="BPMNPlane_loan_approval" bpmnElement="loan_approval">
           <bpmndi:BPMNShape id="start_event_shape" bpmnElement="start_event">
             <omgdc:Bounds x="100" y="100" width="36" height="36"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="submit_application_shape" bpmnElement="submit_application">
             <omgdc:Bounds x="200" y="100" width="80" height="60"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="automated_check_shape" bpmnElement="automated_check">
             <omgdc:Bounds x="350" y="100" width="80" height="60"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="gateway_approval_shape" bpmnElement="gateway_approval">
             <omgdc:Bounds x="500" y="100" width="50" height="50"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="manual_review_shape" bpmnElement="manual_review">
             <omgdc:Bounds x="650" y="100" width="80" height="60"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="approved_end_shape" bpmnElement="approved_end">
             <omgdc:Bounds x="800" y="100" width="36" height="36"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNShape id="rejected_end_shape" bpmnElement="rejected_end">
             <omgdc:Bounds x="650" y="200" width="36" height="36"/>
           </bpmndi:BPMNShape>
           <bpmndi:BPMNEdge id="flow1_edge" bpmnElement="flow1">
             <omgdi:waypoint x="136" y="118"/>
             <omgdi:waypoint x="200" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow2_edge" bpmnElement="flow2">
             <omgdi:waypoint x="280" y="118"/>
             <omgdi:waypoint x="350" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow3_edge" bpmnElement="flow3">
             <omgdi:waypoint x="430" y="118"/>
             <omgdi:waypoint x="500" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow4_edge" bpmnElement="flow4">
             <omgdi:waypoint x="550" y="118"/>
             <omgdi:waypoint x="650" y="118"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow5_edge" bpmnElement="flow5">
             <omgdi:waypoint x="525" y="118"/>
             <omgdi:waypoint x="650" y="218"/>
           </bpmndi:BPMNEdge>
           <bpmndi:BPMNEdge id="flow6_edge" bpmnElement="flow6">
             <omgdi:waypoint x="730" y="118"/>
             <omgdi:waypoint x="800" y="118"/>
           </bpmndi:BPMNEdge>
         </bpmndi:BPMNPlane>
       </bpmndi:BPMNDiagram>
     </definitions>

  6. Important Notes:
     - Ensure each <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> references a valid BPMN element from the process using the bpmnElement attribute.
     - Adjust the coordinates (x, y) in <omgdc:Bounds> and <omgdi:waypoint> to align elements neatly on the diagram.
     - Validate the XML structure with a BPMN validator or schema to ensure compliance with BPMN 2.0 standards.

  Make sure the generated XML is properly formatted for readability and all connections between elements are accurately represented in the diagram.
  Output only the XML.`

/**
 *
 * @param process
 * @returns
 */
export const bpmnPrompt003 = (
  process: string
) => `Generate a BPMN 2.0 XML file that includes a well-structured process definition ${
  process ? `for ${process}` : ''
} along with the necessary diagram elements to visualize it. The generated XML should adhere to the following detailed instructions to ensure it properly renders the process flow and arrows between elements:

1. General Structure:
   - Start the XML with a <definitions> tag, including these namespaces:
     - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
     - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
     - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
     - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
   - Include the targetNamespace attribute with an appropriate URI, such as "http://bpmn.example.com/your_process".

2. Process Definition:
   - Define the process using a <process> element with a unique id and name.
   - The process should include the following elements:
     - <startEvent> for the initiation of the process, with an outgoing sequence flow.
     - <userTask> for user interactions, each with incoming and outgoing sequence flows.
     - <serviceTask> for automated tasks, each with incoming and outgoing sequence flows.
     - <exclusiveGateway> for decision points, each with incoming and multiple outgoing sequence flows.
     - <endEvent> to mark the end of the process, with an incoming sequence flow.
     - <sequenceFlow> elements to define transitions between events and tasks, using sourceRef and targetRef to link them correctly.
   - Ensure each element includes required attributes like id and name and that the sequence flows are properly connected to create a clear process flow.

3. BPMN Diagram Elements:
   - Include a <bpmndi:BPMNDiagram> element directly under <definitions> to represent the visual layout of the process.
   - Inside the <bpmndi:BPMNDiagram>, add a <bpmndi:BPMNPlane> with id and bpmnElement attributes that reference the id of the defined process.
   - The <bpmndi:BPMNPlane> should contain graphical representations of all flow nodes and connections using <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> elements.

4. Shapes and Edges:
   - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes such as <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, and <endEvent>:
     - Set the bpmnElement attribute to reference the id of the corresponding BPMN element.
     - Include <omgdc:Bounds> with x, y, width, and height to specify the position and size of each element on the diagram.
   - Use <bpmndi:BPMNEdge> for each <sequenceFlow> to represent the arrows connecting elements:
     - Set the bpmnElement attribute to the id of the sequence flow.
     - Include multiple <omgdi:waypoint> elements with x and y coordinates to define the path and curvature of the arrows between shapes.

5. Example Structures:
   Below are multiple examples of more comprehensive BPMN XML structures, each representing a different process with detailed diagram elements:

   Example 1: Document Review Process

   <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                targetNamespace="http://bpmn.example.com/documentreview">

     <process id="document_review" name="Document Review Process">
       <startEvent id="start_event" name="Start Event">
         <outgoing>flow1</outgoing>
       </startEvent>
       <userTask id="review_task" name="Review Document">
         <incoming>flow1</incoming>
         <outgoing>flow2</outgoing>
       </userTask>
       <serviceTask id="notify_task" name="Send Notification">
         <incoming>flow2</incoming>
         <outgoing>flow3</outgoing>
       </serviceTask>
       <endEvent id="end_event" name="End Event">
         <incoming>flow3</incoming>
       </endEvent>
       <sequenceFlow id="flow1" sourceRef="start_event" targetRef="review_task"/>
       <sequenceFlow id="flow2" sourceRef="review_task" targetRef="notify_task"/>
       <sequenceFlow id="flow3" sourceRef="notify_task" targetRef="end_event"/>
     </process>

     <bpmndi:BPMNDiagram id="BPMNDiagram_document_review">
       <bpmndi:BPMNPlane id="BPMNPlane_document_review" bpmnElement="document_review">
         <bpmndi:BPMNShape id="start_event_shape" bpmnElement="start_event">
           <omgdc:Bounds x="100" y="100" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="review_task_shape" bpmnElement="review_task">
           <omgdc:Bounds x="200" y="100" width="80" height="60"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="notify_task_shape" bpmnElement="notify_task">
           <omgdc:Bounds x="350" y="100" width="80" height="60"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="end_event_shape" bpmnElement="end_event">
           <omgdc:Bounds x="500" y="100" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="flow1_edge" bpmnElement="flow1">
           <omgdi:waypoint x="136" y="118"/>
           <omgdi:waypoint x="200" y="118"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow2_edge" bpmnElement="flow2">
           <omgdi:waypoint x="280" y="118"/>
           <omgdi:waypoint x="350" y="118"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow3_edge" bpmnElement="flow3">
           <omgdi:waypoint x="430" y="118"/>
           <omgdi:waypoint x="500" y="118"/>
         </bpmndi:BPMNEdge>
       </bpmndi:BPMNPlane>
     </bpmndi:BPMNDiagram>
   </definitions>

   Example 2: Loan Application and Approval Process

   <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                targetNamespace="http://bpmn.example.com/loanapproval">

     <process id="loan_approval" name="Loan Approval Process">
       <startEvent id="start_event" name="Start Loan Application">
         <outgoing>flow1</outgoing>
       </startEvent>
       <userTask id="submit_application" name="Submit Application">
         <incoming>flow1</incoming>
         <outgoing>flow2</outgoing>
       </userTask>
       <serviceTask id="automated_check" name="Automated Credit Check">
         <incoming>flow2</incoming>
         <outgoing>flow3</outgoing>
       </serviceTask>
       <exclusiveGateway id="gateway_approval" name="Approval Decision">
         <incoming>flow3</incoming>
         <outgoing>flow4</outgoing>
         <outgoing>flow5</outgoing>
       </exclusiveGateway>
       <userTask id="manual_review" name="Manual Review">
         <incoming>flow4</incoming>
         <outgoing>flow6</outgoing>
       </userTask>
       <endEvent id="approved_end" name="Application Approved">
         <incoming>flow6</incoming>
       </endEvent>
       <endEvent id="rejected_end" name="Application Rejected">
         <incoming>flow5</incoming>
       </endEvent>
       <sequenceFlow id="flow1" sourceRef="start_event" targetRef="submit_application"/>
       <sequenceFlow id="flow2" sourceRef="submit_application" targetRef="automated_check"/>
       <sequenceFlow id="flow3" sourceRef="automated_check" targetRef="gateway_approval"/>
       <sequenceFlow id="flow4" sourceRef="gateway_approval" targetRef="manual_review" name="Requires Manual Review"/>
       <sequenceFlow id="flow5" sourceRef="gateway_approval" targetRef="rejected_end" name="Rejected"/>
       <sequenceFlow id="flow6" sourceRef="manual_review" targetRef="approved_end"/>
     </process>

     <bpmndi:BPMNDiagram id="BPMNDiagram_loan_approval">
       <bpmndi:BPMNPlane id="BPMNPlane_loan_approval" bpmnElement="loan_approval">
         <bpmndi:BPMNShape id="start_event_shape" bpmnElement="start_event">
           <omgdc:Bounds x="100" y="150" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="submit_application_shape" bpmnElement="submit_application">
           <omgdc:Bounds x="200" y="150" width="80" height="60"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="automated_check_shape" bpmnElement="automated_check">
           <omgdc:Bounds x="350" y="150" width="80" height="60"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="gateway_approval_shape" bpmnElement="gateway_approval">
           <omgdc:Bounds x="500" y="150" width="50" height="50"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="manual_review_shape" bpmnElement="manual_review">
           <omgdc:Bounds x="600" y="100" width="80" height="60"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="approved_end_shape" bpmnElement="approved_end">
           <omgdc:Bounds x="750" y="100" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="rejected_end_shape" bpmnElement="rejected_end">
           <omgdc:Bounds x="600" y="250" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="flow1_edge" bpmnElement="flow1">
           <omgdi:waypoint x="136" y="168"/>
           <omgdi:waypoint x="200" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow2_edge" bpmnElement="flow2">
           <omgdi:waypoint x="280" y="168"/>
           <omgdi:waypoint x="350" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow3_edge" bpmnElement="flow3">
           <omgdi:waypoint x="430" y="168"/>
           <omgdi:waypoint x="500" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow4_edge" bpmnElement="flow4">
           <omgdi:waypoint x="550" y="168"/>
           <omgdi:waypoint x="600" y="130"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow5_edge" bpmnElement="flow5">
           <omgdi:waypoint x="550" y="168"/>
           <omgdi:waypoint x="600" y="250"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow6_edge" bpmnElement="flow6">
           <omgdi:waypoint x="680" y="130"/>
           <omgdi:waypoint x="750" y="130"/>
         </bpmndi:BPMNEdge>
       </bpmndi:BPMNPlane>
     </bpmndi:BPMNDiagram>
   </definitions>

6. Important Notes:
   - Ensure each <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> references a valid BPMN element from the process using the bpmnElement attribute.
   - Adjust the coordinates (x, y) in <omgdc:Bounds> and <omgdi:waypoint> to align elements neatly on the diagram.
   - Validate the XML structure with a BPMN validator or schema to ensure compliance with BPMN 2.0 standards.

Make sure the generated XML is properly formatted for readability and all connections between elements are accurately represented in the diagram.
Provide only the XML. Refer to prior messages for additional context regarding the business process.`

/**
 *
 * @param process
 * @returns
 */
export const bpmnPrompt004 = (
  process: string
) => `Generate a BPMN 2.0 XML file that includes a well-structured process definition ${
  process ? `for ${process}` : ''
} along with the necessary diagram elements to visualize it. The generated XML should adhere to the following detailed instructions to ensure it properly renders the process flow and arrows between elements:

1. General Structure:
   - Start the XML with a <definitions> tag, including these namespaces:
     - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
     - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
     - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
     - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
   - Include the targetNamespace attribute with an appropriate URI, such as "http://bpmn.example.com/complex_process".

2. Process Definition:
   - Define the process using a <process> element with a unique id and name.
   - The process should include the following elements:
     - <startEvent> for the initiation of the process, with an outgoing sequence flow.
     - <userTask> for user interactions, each with incoming and outgoing sequence flows.
     - <serviceTask> for automated tasks, each with incoming and outgoing sequence flows.
     - <exclusiveGateway> for decision points, each with incoming and multiple outgoing sequence flows.
     - <parallelGateway> for parallel flows, allowing multiple paths.
     - <subProcess> for grouping a set of tasks under a single block.
     - <endEvent> to mark the end of the process, with an incoming sequence flow.
     - <sequenceFlow> elements to define transitions between events and tasks, using sourceRef and targetRef to link them correctly.
   - Include multiple <laneSet> elements under <process> to represent different swimlanes for various participants.

3. BPMN Diagram Elements:
   - Include a <bpmndi:BPMNDiagram> element directly under <definitions> to represent the visual layout of the process.
   - Inside the <bpmndi:BPMNDiagram>, add a <bpmndi:BPMNPlane> with id and bpmnElement attributes that reference the id of the defined process.
   - The <bpmndi:BPMNPlane> should contain graphical representations of all flow nodes and connections using <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> elements.

4. Shapes and Edges:
   - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes such as <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, <parallelGateway>, <subProcess>, and <endEvent>:
     - Set the bpmnElement attribute to reference the id of the corresponding BPMN element.
     - Include <omgdc:Bounds> with x, y, width, and height to specify the position and size of each element on the diagram.
   - Use <bpmndi:BPMNEdge> for each <sequenceFlow> to represent the arrows connecting elements:
     - Set the bpmnElement attribute to the id of the sequence flow.
     - Include multiple <omgdi:waypoint> elements with x and y coordinates to define the path and curvature of the arrows between shapes.

5. Example Structure:
   Below is an example of a more complex BPMN XML structure for a loan approval process, including multiple swimlanes and various BPMN elements:

   <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                targetNamespace="http://bpmn.example.com/loanapproval">

     <process id="loan_approval_process" name="Loan Approval Process">
       <laneSet id="laneSet_1">
         <lane id="applicant_lane" name="Applicant">
           <flowNodeRef>start_event</flowNodeRef>
           <flowNodeRef>submit_application_task</flowNodeRef>
         </lane>
         <lane id="reviewer_lane" name="Reviewer">
           <flowNodeRef>review_application_task</flowNodeRef>
           <flowNodeRef>exclusive_gateway_decision</flowNodeRef>
         </lane>
         <lane id="system_lane" name="System">
           <flowNodeRef>automated_check_task</flowNodeRef>
           <flowNodeRef>send_notification_task</flowNodeRef>
         </lane>
         <lane id="manager_lane" name="Manager">
           <flowNodeRef>final_approval_task</flowNodeRef>
         </lane>
       </laneSet>
       <startEvent id="start_event" name="Start Loan Process">
         <outgoing>flow1</outgoing>
       </startEvent>
       <userTask id="submit_application_task" name="Submit Application">
         <incoming>flow1</incoming>
         <outgoing>flow2</outgoing>
       </userTask>
       <serviceTask id="automated_check_task" name="Perform Automated Credit Check">
         <incoming>flow2</incoming>
         <outgoing>flow3</outgoing>
       </serviceTask>
       <userTask id="review_application_task" name="Review Application">
         <incoming>flow3</incoming>
         <outgoing>flow4</outgoing>
       </userTask>
       <exclusiveGateway id="exclusive_gateway_decision" name="Application Decision">
         <incoming>flow4</incoming>
         <outgoing>flow5</outgoing>
         <outgoing>flow6</outgoing>
       </exclusiveGateway>
       <userTask id="final_approval_task" name="Final Approval">
         <incoming>flow5</incoming>
         <outgoing>flow7</outgoing>
       </userTask>
       <serviceTask id="send_notification_task" name="Send Approval Notification">
         <incoming>flow7</incoming>
         <outgoing>flow8</outgoing>
       </serviceTask>
       <endEvent id="approved_end_event" name="Application Approved">
         <incoming>flow8</incoming>
       </endEvent>
       <endEvent id="rejected_end_event" name="Application Rejected">
         <incoming>flow6</incoming>
       </endEvent>
       <sequenceFlow id="flow1" sourceRef="start_event" targetRef="submit_application_task"/>
       <sequenceFlow id="flow2" sourceRef="submit_application_task" targetRef="automated_check_task"/>
       <sequenceFlow id="flow3" sourceRef="automated_check_task" targetRef="review_application_task"/>
       <sequenceFlow id="flow4" sourceRef="review_application_task" targetRef="exclusive_gateway_decision"/>
       <sequenceFlow id="flow5" sourceRef="exclusive_gateway_decision" targetRef="final_approval_task" name="Approved"/>
       <sequenceFlow id="flow6" sourceRef="exclusive_gateway_decision" targetRef="rejected_end_event" name="Rejected"/>
       <sequenceFlow id="flow7" sourceRef="final_approval_task" targetRef="send_notification_task"/>
       <sequenceFlow id="flow8" sourceRef="send_notification_task" targetRef="approved_end_event"/>
     </process>

     <bpmndi:BPMNDiagram id="BPMNDiagram_loan_approval">
       <bpmndi:BPMNPlane id="BPMNPlane_loan_approval" bpmnElement="loan_approval_process">
         <bpmndi:BPMNShape id="start_event_shape" bpmnElement="start_event">
           <omgdc:Bounds x="100" y="150" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="submit_application_task_shape" bpmnElement="submit_application_task">
           <omgdc:Bounds x="200" y="150" width="100" height="80"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="automated_check_task_shape" bpmnElement="automated_check_task">
           <omgdc:Bounds x="350" y="150" width="100" height="80"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="review_application_task_shape" bpmnElement="review_application_task">
           <omgdc:Bounds x="500" y="150" width="100" height="80"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="exclusive_gateway_decision_shape" bpmnElement="exclusive_gateway_decision">
           <omgdc:Bounds x="650" y="165" width="50" height="50"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="final_approval_task_shape" bpmnElement="final_approval_task">
           <omgdc:Bounds x="750" y="100" width="100" height="80"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="send_notification_task_shape" bpmnElement="send_notification_task">
           <omgdc:Bounds x="900" y="100" width="100" height="80"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="approved_end_event_shape" bpmnElement="approved_end_event">
           <omgdc:Bounds x="1050" y="100" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape id="rejected_end_event_shape" bpmnElement="rejected_end_event">
           <omgdc:Bounds x="750" y="300" width="36" height="36"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="flow1_edge" bpmnElement="flow1">
           <omgdi:waypoint x="136" y="168"/>
           <omgdi:waypoint x="200" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow2_edge" bpmnElement="flow2">
           <omgdi:waypoint x="300" y="168"/>
           <omgdi:waypoint x="350" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow3_edge" bpmnElement="flow3">
           <omgdi:waypoint x="450" y="168"/>
           <omgdi:waypoint x="500" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow4_edge" bpmnElement="flow4">
           <omgdi:waypoint x="600" y="168"/>
           <omgdi:waypoint x="650" y="168"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow5_edge" bpmnElement="flow5">
           <omgdi:waypoint x="700" y="168"/>
           <omgdi:waypoint x="750" y="140"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow6_edge" bpmnElement="flow6">
           <omgdi:waypoint x="700" y="215"/>
           <omgdi:waypoint x="750" y="318"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow7_edge" bpmnElement="flow7">
           <omgdi:waypoint x="850" y="140"/>
           <omgdi:waypoint x="900" y="140"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="flow8_edge" bpmnElement="flow8">
           <omgdi:waypoint x="1000" y="140"/>
           <omgdi:waypoint x="1050" y="140"/>
         </bpmndi:BPMNEdge>
       </bpmndi:BPMNPlane>
     </bpmndi:BPMNDiagram>
   </definitions>

6. Important Notes:
   - Ensure each <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> references a valid BPMN element from the process using the bpmnElement attribute.
   - Adjust the coordinates (x, y) in <omgdc:Bounds> and <omgdi:waypoint> to align elements neatly on the diagram.
   - Validate the XML structure with a BPMN validator or schema to ensure compliance with BPMN 2.0 standards.

Make sure the generated XML is properly formatted for readability and all connections between elements are accurately represented in the diagram.
Provide only the XML. Refer to prior messages for additional context regarding the business process.`

/**
 *
 * @param process
 * @returns
 */
export const bpmnPrompt005 = (
  process: string
) => `Generate a BPMN 2.0 XML file that includes a well-structured process definition ${
  process ? `for the ${process}` : ''
} with required diagram elements for rendering with visualization software like bpmn-visualization.
  Refer to prior messages in this chat for additional context on the process.
  Follow these instructions to ensure the XML is BPMN 2.0-compliant and renders all elements with arrows for flow:
    1. General Structure:
       - Start the XML with a <definitions> tag, including these namespaces:
         - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
         - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
         - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
         - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
       - Include the targetNamespace attribute with an appropriate URI, such as "http://bpmn.example.com/idea-to-process".
    2. Process Definition:
       - Define the process using a <process> element with a unique id and name.
       - Create a <process> with id and name attributes, and include essential elements:
       - The process should include the following elements:
         - <startEvent> for the initiation of the process, with an outgoing sequence flow.
         - <userTask> for user interactions, each with incoming and outgoing sequence flows.
         - <serviceTask> for automated tasks, each with incoming and outgoing sequence flows.
         - <exclusiveGateway> for decision points, each with incoming and multiple outgoing sequence flows.
         - <endEvent> to mark the end of the process, with an incoming sequence flow.
         - <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, and <endEvent>, each with <outgoing> and <incoming> sequence flows to link tasks correctly.
         - Define <sequenceFlow> elements using id, sourceRef, and targetRef attributes to represent transitions between nodes accurately.
       - Ensure each element includes required attributes like id and name and that the sequence flows are properly connected to create a clear process flow.
       - Avoid non-standard extensions (e.g., <dc:initiatorRef>) unless BPMN 2.0-compliant.
    3. BPMN Diagram Elements:
       - Include a <bpmndi:BPMNDiagram> directly under <definitions> for the process layout:
         - There should be only one <bpmndi:BPMNDiagram> element per process
         - Add a <bpmndi:BPMNPlane> element with id and bpmnElement referencing the process ID.
           - There should be only one <bpmndi:BPMNPlane> element per diagram
         - Define each node with <bpmndi:BPMNShape>:
           - Reference the bpmnElement ID, and add <omgdc:Bounds> with x, y, width, and height to position each shape.
         - Define <sequenceFlow> paths with <bpmndi:BPMNEdge>:
           - Ensure bpmnElement references the <sequenceFlow> ID.
           - Add <omgdi:waypoint> elements with x and y to create a clear path between shapes, avoiding use of sourceRef and targetRef in <bpmndi:BPMNEdge>.
           - <sequenceFlow> elements should be defined as direct children of the <process> element
           - <incoming> and <outgoing> should only contain the IDs of <sequenceFlow> elements and not the elements themselves
       - Inside the <bpmndi:BPMNDiagram>, add a <bpmndi:BPMNPlane> with id and bpmnElement attributes that reference the id of the defined process.
       - The <bpmndi:BPMNPlane> should contain graphical representations of all flow nodes and connections using <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> elements.
    4. Shapes and Edges:
       - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes such as <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, and <endEvent>:
         - Set the bpmnElement attribute to reference the id of the corresponding BPMN element.
         - Include <omgdc:Bounds> with x, y, width, and height to specify the position and size of each element on the diagram.
       - Use <bpmndi:BPMNEdge> for each <sequenceFlow> to represent the arrows connecting elements:
         - Set the bpmnElement attribute to the id of the sequence flow.
         - Include multiple <omgdi:waypoint> elements with x and y coordinates to define the path and curvature of the arrows between shapes.
         - Do not include sourceRef and targetRef attributes in <bpmndi:BPMNEdge> elements
    5. Compliance and Rendering Requirements:
       - XML strucutre must be well formed.
       - Structure the XML for BPMN 2.0 compliance and validate with a BPMN schema if possible.
       - Ensure proper flow direction by linking <sequenceFlow> correctly between events, tasks, and gateways.
       - Generate only the XML and ensure it is indented and formatted for readability.
    6. Important Notes:
       - Ensure each <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> references a valid BPMN element from the process using the bpmnElement attribute.
       - Ensure inside the <bpmndi:BPMNDiagram>, add a <bpmndi:BPMNPlane> with id and bpmnElement attributes that reference the id of the defined process.
       - Adjust the coordinates (x, y) in <omgdc:Bounds> and <omgdi:waypoint> to align elements neatly on the diagram.
       - Validate the XML structure with a BPMN validator or schema to ensure compliance with BPMN 2.0 standards.
    7. Example XML:
       <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                    targetNamespace="http://bpmn.example.com/idea-to-process">
         <process id="PTOApprovalProcess" name="PTO Approval Process">
           <startEvent id="StartEvent" name="Submit PTO Request">
             <outgoing>SequenceFlow_1</outgoing>
           </startEvent>

           <userTask id="EmployeeTalksToManager" name="Employee Talks to Manager">
             <incoming>SequenceFlow_1</incoming>
             <outgoing>SequenceFlow_2</outgoing>
           </userTask>

           <serviceTask id="ManagerReviewsPTORequest" name="Manager Reviews PTO Request">
             <incoming>SequenceFlow_2</incoming>
             <outgoing>SequenceFlow_3</outgoing>
             <outgoing>SequenceFlow_4</outgoing>
           </serviceTask>

           <exclusiveGateway id="PTOApproved" name="PTO Approved">
             <incoming>SequenceFlow_3</incoming>
             <outgoing>SequenceFlow_5</outgoing>
           </exclusiveGateway>

           <serviceTask id="PTODenied" name="PTO Denied">
             <incoming>SequenceFlow_4</incoming>
             <outgoing>SequenceFlow_6</outgoing>
           </serviceTask>

           <userTask id="PTOProcessed" name="PTO Processed">
             <incoming>SequenceFlow_5</incoming>
             <outgoing>SequenceFlow_7</outgoing>
           </userTask>

           <endEvent id="EndEvent" name="End Event">
             <incoming>SequenceFlow_6</incoming>
             <incoming>SequenceFlow_7</incoming>
           </endEvent>

           <!-- Sequence Flows -->
           <sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent" targetRef="EmployeeTalksToManager"/>
           <sequenceFlow id="SequenceFlow_2" sourceRef="EmployeeTalksToManager" targetRef="ManagerReviewsPTORequest"/>
           <sequenceFlow id="SequenceFlow_3" sourceRef="ManagerReviewsPTORequest" targetRef="PTOApproved"/>
           <sequenceFlow id="SequenceFlow_4" sourceRef="ManagerReviewsPTORequest" targetRef="PTODenied"/>
           <sequenceFlow id="SequenceFlow_5" sourceRef="PTOApproved" targetRef="PTOProcessed"/>
           <sequenceFlow id="SequenceFlow_6" sourceRef="PTODenied" targetRef="EndEvent"/>
           <sequenceFlow id="SequenceFlow_7" sourceRef="PTOProcessed" targetRef="EndEvent"/>
         </process>

         <!-- Diagram Elements -->
         <bpmndi:BPMNDiagram id="BPMNDiagram_1">
           <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="PTOApprovalProcess">
             <bpmndi:BPMNShape id="StartEvent_shape" bpmnElement="StartEvent">
               <omgdc:Bounds x="100" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNShape id="EmployeeTalksToManager_shape" bpmnElement="EmployeeTalksToManager">
               <omgdc:Bounds x="200" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_1_edge" bpmnElement="SequenceFlow_1">
               <omgdi:waypoint x="150" y="75"/>
               <omgdi:waypoint x="200" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNShape id="ManagerReviewsPTORequest_shape" bpmnElement="ManagerReviewsPTORequest">
               <omgdc:Bounds x="300" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_2_edge" bpmnElement="SequenceFlow_2">
               <omgdi:waypoint x="250" y="75"/>
               <omgdi:waypoint x="300" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNShape id="PTOApproved_shape" bpmnElement="PTOApproved">
               <omgdc:Bounds x="400" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_3_edge" bpmnElement="SequenceFlow_3">
               <omgdi:waypoint x="350" y="75"/>
               <omgdi:waypoint x="400" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNShape id="PTODenied_shape" bpmnElement="PTODenied">
               <omgdc:Bounds x="500" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_4_edge" bpmnElement="SequenceFlow_4">
               <omgdi:waypoint x="450" y="75"/>
               <omgdi:waypoint x="500" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNShape id="PTOProcessed_shape" bpmnElement="PTOProcessed">
               <omgdc:Bounds x="600" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_5_edge" bpmnElement="SequenceFlow_5">
               <omgdi:waypoint x="550" y="75"/>
               <omgdi:waypoint x="600" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNShape id="EndEvent_shape" bpmnElement="EndEvent">
               <omgdc:Bounds x="700" y="50" width="50" height="50"/>
             </bpmndi:BPMNShape>
             <bpmndi:BPMNEdge id="SequenceFlow_6_edge" bpmnElement="SequenceFlow_6">
               <omgdi:waypoint x="650" y="75"/>
               <omgdi:waypoint x="700" y="75"/>
             </bpmndi:BPMNEdge>
             <bpmndi:BPMNEdge id="SequenceFlow_7_edge" bpmnElement="SequenceFlow_7">
               <omgdi:waypoint x="650" y="75"/>
               <omgdi:waypoint x="700" y="75"/>
             </bpmndi:BPMNEdge>
           </bpmndi:BPMNPlane>
         </bpmndi:BPMNDiagram>
       </definitions>
    Output only the XML.`

export const bpmnPrompt006 = (
  process: string
) => `Generate a BPMN 2.0 XML file ${
  process ? `for ${process}` : ''
} that is well-structured, compliant with BPMN 2.0 standards, and compatible with the bpmn-visualization library. Refer to prior messages in this chat exchange for additional context regarding the process. Follow these detailed instructions:

1. XML Structure:
   - The XML should start with a <definitions> tag and include the following namespaces:
     - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
     - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
     - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
     - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
     - Set the targetNamespace attribute appropriately.
   - Use consistent namespaces throughout the XML.

2. Process Definition:
   - Define the process using a <process> element with an id and name.
   - If different roles or participants are present, then define a complex process using a <process> element with multiple lanes representing those roles and/or participants. Otherwise, define a simple or complex process as appropriate.
   - Include elements such as <startEvent>, <userTask>, <serviceTask>, <exclusiveGateway>, <endEvent>, and <sequenceFlow> to represent the process flow.
   - Define each <sequenceFlow> directly under the <process> element, ensuring that sourceRef and targetRef attributes correctly reference the IDs of BPMN elements (e.g., startEvent, userTask).
   - Inside flow nodes like <userTask> and <serviceTask>, use <incoming> and <outgoing> tags to reference only the IDs of <sequenceFlow> elements, not the entire definition.

3. Diagram Elements for Rendering:
   - Add a <bpmndi:BPMNDiagram> element directly under <definitions> to represent the graphical layout of the process.
   - Add a <bpmndi:BPMNPlane> directly under <bpmndi:BPMNDiagram> that references the process ID.
   - The <bpmndi:BPMNPlane> must include an "id" and "bpmnElement" attribute that references the id of the process.
   - Use <bpmndi:BPMNShape> for each flow node (e.g., startEvent, userTask, serviceTask):
     - Reference the element ID using the bpmnElement attribute.
     - Include <omgdc:Bounds> with x, y, width, and height for positioning each shape.
   - Use <bpmndi:BPMNEdge> for each <sequenceFlow>, defining its path using <omgdi:waypoint> elements. Do not use sourceRef or targetRef attributes inside the <bpmndi:BPMNEdge>.

4. Shapes and Edges:
   - Use <bpmndi:BPMNShape> for each graphical representation of flow nodes (e.g., startEvent, userTask, serviceTask, endEvent):
     - Use the bpmnElement attribute to reference the id of the corresponding BPMN element.
     - Include <omgdc:Bounds> to specify the x, y coordinates, width, and height of the element on the diagram.
   - Use <bpmndi:BPMNEdge> for each sequenceFlow:
     - Reference the id of the sequenceFlow using the bpmnElement attribute.
     - Ensure each <bpmndi:BPMNEdge> element has <omgdi:waypoint> elements with x and y attributes to define the path between shapes.
     - Ensure that waypoints visually represent the sequence flow path between elements.

5. Rendering Requirements:
   - The XML must be valid according to BPMN 2.0 and should properly render in the bpmn-visualization library.
   - Ensure that the diagram elements correctly display the flow between tasks, with arrows representing the sequence of actions.
   - Validate the XML against a BPMN XML schema to ensure compliance with the standard.

6. Notes:
   - Ensure that each <bpmndi:BPMNShape> and <bpmndi:BPMNEdge> references a valid BPMN element from the process.
   - Adjust the coordinates (x, y) in Bounds and waypoint elements to ensure proper layout.
   - Align waypoints properly to represent the flow path between shapes visually.

Only output the XML, ensuring it is well-formatted and indented for readability.`

export const bpmnPrompt007 = (
  process: string
) => `Generate only a well-structured BPMN 2.0 XML file that is fully compliant with the BPMN 2.0 specification and includes a BPMNDiagram element to enable accurate rendering in visualization software such as bpmn-visualization ${
  process ? `for ${process}` : ''
}. Refer to the chat history for more context and information about the specific process being modeled. Follow these specific instructions and output only the XML:

1. XML Structure and Namespaces:
   - Begin with a <definitions> element and include the following namespaces:
     - xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
     - xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     - xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
     - xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
     - xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
   - Specify a unique targetNamespace relevant to the process.

2. Process Definition:
   - Define the process within a <process> element, giving it an id and name attribute.
   - Include the following BPMN elements within the process:
     - <startEvent>: Specify the starting point with an id, name, and <outgoing> flows.
     - <userTask>, <serviceTask>, <endEvent>, and <exclusiveGateway> as appropriate for modeling the process steps.
     - For each element, ensure all necessary attributes like id, name, sourceRef, and targetRef are set correctly.

3. Diagram Elements for Rendering:
   - Add a <bpmndi:BPMNDiagram> element directly under <definitions> to represent the graphical layout.
   - Use a <bpmndi:BPMNPlane> element with the process id as the bpmnElement reference.
   - For each flow node (e.g., startEvent, userTask, etc.), include a <bpmndi:BPMNShape> with <omgdc:Bounds> for x, y coordinates, width, and height.
   - For each <sequenceFlow>, include a <bpmndi:BPMNEdge> element with <omgdi:waypoint> coordinates for connecting shapes.

4. Additional Guidelines:
   - Ensure compliance with the BPMN 2.0 XML schema and validate with any BPMN-compliant tools.
   - Use clear formatting, and ensure all diagram elements align correctly with flows represented as arrows connecting tasks and events.

Example XML:

<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             targetNamespace="http://www.example.com/schema/process">
  <process id="orderProcess" name="Order Process">
    <startEvent id="startEvent" name="Start">
      <outgoing>flow1</outgoing>
    </startEvent>
    <userTask id="orderTask" name="Process Order">
      <incoming>flow1</incoming>
      <outgoing>flow2</outgoing>
    </userTask>
    <exclusiveGateway id="decisionGateway" name="Decision">
      <incoming>flow2</incoming>
      <outgoing>flow3</outgoing>
      <outgoing>flow4</outgoing>
    </exclusiveGateway>
    <serviceTask id="approvalTask" name="Approve Order">
      <incoming>flow3</incoming>
      <outgoing>flow5</outgoing>
    </serviceTask>
    <endEvent id="endEvent" name="End">
      <incoming>flow5</incoming>
    </endEvent>
    <sequenceFlow id="flow1" sourceRef="startEvent" targetRef="orderTask"/>
    <sequenceFlow id="flow2" sourceRef="orderTask" targetRef="decisionGateway"/>
    <sequenceFlow id="flow3" sourceRef="decisionGateway" targetRef="approvalTask"/>
    <sequenceFlow id="flow5" sourceRef="approvalTask" targetRef="endEvent"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_orderProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_orderProcess" bpmnElement="orderProcess">
      <bpmndi:BPMNShape bpmnElement="startEvent">
        <omgdc:Bounds x="100" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="orderTask">
        <omgdc:Bounds x="200" y="100" width="80" height="100"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="decisionGateway">
        <omgdc:Bounds x="400" y="100" width="50" height="50"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="approvalTask">
        <omgdc:Bounds x="500" y="100" width="80" height="100"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endEvent">
        <omgdc:Bounds x="700" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow1">
        <omgdi:waypoint x="136" y="118"/>
        <omgdi:waypoint x="200" y="118"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow2">
        <omgdi:waypoint x="280" y="118"/>
        <omgdi:waypoint x="400" y="118"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3">
        <omgdi:waypoint x="450" y="118"/>
        <omgdi:waypoint x="500" y="118"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow5">
        <omgdi:waypoint x="580" y="118"/>
        <omgdi:waypoint x="700" y="118"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`

/**
 *
 * @returns
 */
export const systemPrompt = () => `
    You are an expert in Business Process Model and Notation (BPMN).
    Your task is to create detailed BPMN diagrams based on provided business scenarios.
    For each scenario, include the following elements in the BPMN XML format:
        1. Start Event: Define the initiation of the process.
        2. Tasks: Identify key tasks that must be performed.
        3. Gateways: Specify decision points that direct the flow of the process.
        4. Sequence Flows: Indicate the connections and orders between events, tasks, and gateways.
        5. End Event: Conclude the process.
        6. Extensions (if applicable): Add any relevant extensions to provide additional context or data.
    Ensure that the BPMN follows best practices, uses clear naming conventions, and is correctly formatted in XML.
`

// "You are an expert in Business Process Model and Notation (BPMN). Your task is to create detailed BPMN diagrams based on provided business scenarios. For each scenario, include the following elements in the BPMN XML format: 1. Start Event: Define the initiation of the process, 2. Tasks: Identify key tasks that must be performed, 3. Gateways: Specify decision points that direct the flow of the process, 4. Sequence Flows: Indicate the connections and orders between events, tasks, and gateways, 5. End Event: Conclude the process, 6. Extensions (if applicable): Add any relevant extensions to provide additional context or data. Ensure that the BPMN follows best practices, uses clear naming conventions, and is correctly formatted in XML."
