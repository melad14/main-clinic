// io.on('connection', (socket) => {
//     console.log(`Socket connected`);
  
//     socket.on('sendMessage', async (data) => {
//       const { senderRole, senderId, receiverId, messageContent } = data;
      
//       let receiverRole = senderRole === 'user' ? 'admin' : 'user';
//       try {
//         const message = new messageModel({
//           sender: senderId,
//           senderModel: senderRole,
//           receiver: receiverId,
//           receiverModel: receiverRole,
//           message: messageContent
//         });
  
//         await message.save();
  
//         socket.emit('newMessage', message); 
//         socket.to(receiverId).emit('newMessage', message); 
    
//         console.log("Message sent successfully");
//       } catch (error) {
//         console.error("Error sending message:", error.message);
//       }
//     });
  
//     socket.on('disconnect', () => {
//       console.log(`Socket disconnected`);
//     });
//   });
  