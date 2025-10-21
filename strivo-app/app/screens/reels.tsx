import {
  Gift,
  Heart,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  X,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: number;
  timeAgo: string;
  replies?: number;
  isLiked?: boolean;
}

interface Klip {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  videoUrl: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  isLiked?: boolean;
  isFollowing?: boolean;
}

const KlipsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(Video | null)[]>([]);
  
  const [klips, setKlips] = useState<Klip[]>([
    {
      id: '1',
      user: {
        name: 'Enrico Delafio',
        username: 'enrico.delafio',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://i.pravatar.cc/400?img=12',
      likes: 53200,
      comments: 307,
      shares: 5848,
      description: 'Se você fizer isso pode ter certeza que vai dar certo! 🔥',
      isLiked: false,
      isFollowing: false,
    },
    {
      id: '2',
      user: {
        name: 'Maria Silva',
        username: 'maria.silva',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://i.pravatar.cc/400?img=5',
      likes: 42100,
      comments: 189,
      shares: 3421,
      description: 'Momento incrível capturado em câmera lenta! 🎥✨',
      isLiked: false,
      isFollowing: false,
    },
    {
      id: '3',
      user: {
        name: 'João Pedro',
        username: 'joao.pedro',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://i.pravatar.cc/400?img=8',
      likes: 67800,
      comments: 521,
      shares: 7234,
      description: 'Essa é a melhor dica que você vai ver hoje! 💡',
      isLiked: false,
      isFollowing: false,
    },
  ]);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        name: 'Gabriel',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      text: 'tadinha da Índia🇮🇳\nkkkkkkkkkkkkkkkkkkkk',
      likes: 412,
      timeAgo: '3d',
      replies: 4,
      isLiked: false,
    },
    {
      id: '2',
      user: {
        name: 'moreira44',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      text: 'namoral que ainda jogam isso',
      likes: 519,
      timeAgo: '3d',
      isLiked: false,
    },
    {
      id: '3',
      user: {
        name: 'Tropa da Bélgica',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      text: '800 players diários',
      likes: 0,
      timeAgo: '2d',
      isLiked: false,
    },
    {
      id: '4',
      user: {
        name: 'Ana Costa',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      text: 'Muito bom! Adorei o conteúdo 😍',
      likes: 234,
      timeAgo: '1d',
      isLiked: false,
    },
  ]);

  const activeKlip = klips[currentIndex];

  const toggleLike = () => {
    setKlips(
      klips.map((klip, index) =>
        index === currentIndex
          ? {
              ...klip,
              isLiked: !klip.isLiked,
              likes: klip.isLiked ? klip.likes - 1 : klip.likes + 1,
            }
          : klip
      )
    );
  };

  const toggleFollow = () => {
    setKlips(
      klips.map((klip, index) =>
        index === currentIndex
          ? { ...klip, isFollowing: !klip.isFollowing }
          : klip
      )
    );
  };

  const toggleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: String(comments.length + 1),
        user: {
          name: 'Você',
          avatar: 'https://i.pravatar.cc/150?img=20',
        },
        text: commentText,
        likes: 0,
        timeAgo: 'agora',
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      
      setKlips(
        klips.map((klip, index) =>
          index === currentIndex
            ? { ...klip, comments: klip.comments + 1 }
            : klip
        )
      );
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}mil`;
    }
    return num.toString();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12 }}>
      <Image
        source={{ uri: item.user.avatar }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
            {item.user.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => toggleCommentLike(item.id)}
              style={{ marginRight: 8 }}
            >
              <Heart
                size={16}
                color={item.isLiked ? '#00FF7F' : '#fff'}
                fill={item.isLiked ? '#00FF7F' : 'none'}
              />
            </TouchableOpacity>
            <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{item.likes}</Text>
          </View>
        </View>
        <Text style={{ color: 'white', fontSize: 14, marginTop: 4 }}>{item.text}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{item.timeAgo}</Text>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Text style={{ color: '#9CA3AF', fontSize: 12, fontWeight: '500' }}>Responder</Text>
          </TouchableOpacity>
        </View>
        {item.replies && item.replies > 0 && (
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Text style={{ color: '#9CA3AF', fontSize: 12 }}>
              Exibir {item.replies} respostas ›
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderKlip = ({ item, index }: { item: Klip; index: number }) => (
    <View style={{ height: SCREEN_HEIGHT, width: '100%', backgroundColor: 'black' }}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item.videoUrl }}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={index === currentIndex}
        isLooping
        isMuted={false}
      />

      {/* Top Bar */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 50,
          paddingBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Klips</Text>
        <TouchableOpacity>
          <MoreVertical size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right Side Actions */}
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 180,
          alignItems: 'center',
        }}
      >
        {/* User Avatar + Follow */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Image
            source={{ uri: item.user.avatar }}
            style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: 'white' }}
          />
          {!item.isFollowing && (
            <TouchableOpacity
              onPress={toggleFollow}
              style={{
                position: 'absolute',
                bottom: -8,
                backgroundColor: '#00FF7F',
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={18} color="black" strokeWidth={3} />
            </TouchableOpacity>
          )}
        </View>

        {/* Like */}
        <TouchableOpacity onPress={toggleLike} style={{ alignItems: 'center', marginBottom: 24 }}>
          <Heart
            size={36}
            color={item.isLiked ? '#00FF7F' : '#fff'}
            fill={item.isLiked ? '#00FF7F' : 'none'}
            strokeWidth={1.5}
          />
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '500', marginTop: 4 }}>
            {formatNumber(item.likes)}
          </Text>
        </TouchableOpacity>

        {/* Comments */}
        <TouchableOpacity
          onPress={() => setShowComments(true)}
          style={{ alignItems: 'center', marginBottom: 24 }}
        >
          <MessageCircle size={36} color="#fff" strokeWidth={1.5} />
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '500', marginTop: 4 }}>
            {item.comments}
          </Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Send size={36} color="#fff" strokeWidth={1.5} />
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '500', marginTop: 4 }}>
            {formatNumber(item.shares)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
          <LinearGradient
          colors={['transparent', 'black']} // transparente no topo, preto na base
            start={{ x: 0, y: 0 }}       // opcional: define início do gradiente
            end={{ x: 0, y: 1 }}         // opcional: define fim do gradiente (vertical)
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              paddingHorizontal: 16,
              paddingBottom: 24,
            }}
          >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 12 }}>
            @{item.user.username}
          </Text>
          {!item.isFollowing && (
            <TouchableOpacity
              onPress={toggleFollow}
              style={{
                backgroundColor: '#00FF7F',
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 14 }}>Seguir</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ color: 'white', fontSize: 14 }} numberOfLines={2}>
          {item.description}
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black', marginBottom:0}} >
      <StatusBar style="light" />
      <FlatList
        data={klips}
        renderItem={renderKlip}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Comments Modal */}
  <Modal
  visible={showComments}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setShowComments(false)}
  // Adicionado para Android, para que o modal redimensione quando o teclado aparecer
  // Para iOS, o KeyboardAvoidingView já deve lidar com isso
  hardwareAccelerated={true}
  statusBarTranslucent={true}
>
  <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => setShowComments(false)}
      />
      <View
        style={{
          backgroundColor: '#1a1a1a',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: SCREEN_HEIGHT * 0.7,
        }}
      >
        {/* Header */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#374151',
            position: 'relative',
          }}
        >
          <TouchableOpacity
            onPress={() => setShowComments(false)}
            style={{ position: 'absolute', right: 16, top: 16 }}
          >
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <View
            style={{
              width: 48,
              height: 6,
              backgroundColor: '#4B5563',
              borderRadius: 3,
              marginBottom: 12,
            }}
          />
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
            {comments.length} comentários
          </Text>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Comment Input */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#374151',
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#1a1a1a',
          }}
        >
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=20' }}
            style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
          />
          <TouchableOpacity style={{ marginRight: 8 }}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Inicie uma conversa..."
            placeholderTextColor="#666"
            style={{
              flex: 1,
              color: 'white',
              fontSize: 14,
              backgroundColor: 'transparent',
            }}
            onSubmitEditing={handleAddComment}
          />
          {commentText.trim( ) ? (
            <TouchableOpacity onPress={handleAddComment} style={{ marginLeft: 8 }}>
              <Text style={{ color: '#00FF7F', fontWeight: '600', fontSize: 14 }}>Enviar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <Gift size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
</Modal>

    </View>
  );
};

export default KlipsScreen;

