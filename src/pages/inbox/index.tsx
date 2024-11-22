import { useState, useEffect } from "react";
import { Layout, List, Card, Button, Input, Typography, message } from "antd";
import { sendMessage, onNewMessage, offNewMessage } from "../../utils/socket";
import { Message } from "./types";
import { sendAdminReply } from "../../api/services/chatApi/adminChatApi";

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const AdminPage = () => {
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({}); 
  const [newMessage, setNewMessage] = useState<string>(""); 
  const [selectedUser, setSelectedUser] = useState<string>(""); 

const handleNewMessage = (message: Message) => {
  setMessages((prevMessages) => {
    const userMessages = prevMessages[message.user] || [];
    const isDuplicate = userMessages.some((msg) => msg.timestamp === message.timestamp && msg.message === message.message);
    
    if (isDuplicate) return prevMessages;

    return {
      ...prevMessages,
      [message.user]: [...userMessages, message], 
    };
  });
};

  useEffect(() => {
    onNewMessage(handleNewMessage);

   
    return () => {
      offNewMessage(handleNewMessage);
    };
  }, []);

  // Xử lý gửi tin nhắn từ admin
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData: Message = {
        user: selectedUser || "all", 
        name: "Admin",
        message: newMessage,
        timestamp: new Date().toISOString(),
        sender: "admin",
      };
  
      
      sendMessage(messageData);
      setNewMessage(""); 
      
      sendAdminReply(selectedUser, newMessage).then(() => {
        // Cập nhật tin nhắn vào state sau khi gửi tin nhắn thành công
        setMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages };
          if (messageData.user === "all") {
            // Nếu gửi cho tất cả, thêm tin nhắn vào tất cả user
            Object.keys(updatedMessages).forEach((user) => {
              updatedMessages[user] = [
                ...updatedMessages[user],
                { ...messageData },
              ];
            });
          } else {
            
            const userMessages = updatedMessages[messageData.user] || [];
            updatedMessages[messageData.user] = [...userMessages, messageData];
          }
          return updatedMessages;
        });
  
       
        message.success("Message sent successfully!"); 
      }).catch((error) => {
        console.error("Error sending message:", error);
        // message.error("Failed to send message.");
      });
    }
  };
  

  // Giao diện chính
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#f0f2f5", borderRight: "1px solid #ddd" }}>
        <Title level={3} style={{ textAlign: "center", margin: "10px 0" }}>
          Admin Inbox
        </Title>
        <List
          bordered
          dataSource={Object.keys(messages)} 
          renderItem={(user: string) => {
            const userMessages = messages[user] || [];
            return (
              <List.Item onClick={() => setSelectedUser(user)} style={{ cursor: "pointer" }}>
                <Card title={user} style={{ width: "100%" }}>
                  {userMessages.length > 0 ? `${userMessages.length} messages` : "No messages"}
                </Card>
              </List.Item>
            );
          }}
        />
      </Sider>
  
      <Layout>
        <Content style={{ padding: "20px", background: "#fff" }}>
          {selectedUser && (
            <div>
              <Title level={4}>
                Chat with {selectedUser === "all" ? "All Users" : selectedUser}
              </Title>
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  marginBottom: "20px",
                  padding: "10px",
                  background: "#fafafa",
                  border: "1px solid #ddd",
                }}
              >
        
                {messages[selectedUser]?.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: msg.sender === "admin" ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                    }}
                  >

                    {msg.sender !== "admin" && (
                      <div
                        style={{
                          background: "#e6f7ff",
                          padding: "10px",
                          borderRadius: "8px",
                          maxWidth: "60%",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <strong>{msg.name}</strong> 
                        <div>{msg.message}</div>
                      </div>
                    )}
                    {msg.sender === "admin" && (
                      <div
                        style={{
                          background: "#f0f0f0",
                          padding: "10px",
                          borderRadius: "8px",
                          maxWidth: "60%",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          textAlign: "right",
                        }}
                      >
                        <strong>{msg.name}</strong> 
                        <div>{msg.message}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
  
              <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here"
                rows={2}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                style={{ marginTop: "10px", width: "100%" }}
              >
                Send Message
              </Button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
