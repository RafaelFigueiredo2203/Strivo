import ShareProfile from '@/src/components/share-profile';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AlignStartVertical, ChevronDown, Clapperboard, Grid3X3, Menu, Plus, Repeat2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { SafeAreaView } from 'react-native-safe-area-context';

// Tipos
interface ProfileData {
  username: string;
  name: string;
  bio: string;
  website: string;
  followers: string;
  following: string;
  posts: string;
  avatar: string;
}

const ProfileScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'klips' | 'republicados'>('posts');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isStoryModalVisible, setIsStoryModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasStory, setHasStory] = useState(true); // Define se tem story ativo
  const [storyProgress] = useState(new Animated.Value(0));
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'rafafiguei',
    name: 'Rafa Figueiredo',
    bio: 'Criador de Conteúdo na Strivo',
    website: 'www.strivo.com',
    followers: '1,8M',
    following: '103',
    posts: '529',
    avatar: 'https://avatars.githubusercontent.com/u/60237326?v=4',
  });

  const [editForm, setEditForm] = useState<ProfileData>(profileData);

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditModalVisible(false);
  };

  // Animação do Story
  useEffect(() => {
    if (isStoryModalVisible) {
      storyProgress.setValue(0);
      Animated.timing(storyProgress, {
        toValue: 1,
        duration: 5000, // 5 segundos
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setIsStoryModalVisible(false);
        }
      });
    }
  }, [isStoryModalVisible]);

  const progressWidth = storyProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
   <SafeAreaView className="flex-1 bg-black">
    <View className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-black px-6 py-3 rounded-lg mb-4 flex flex-row w-full justify-between items-end">
        <View className='flex flex-row items-start'>
        <Text className='text-white text-3xl font-bold '><AlignStartVertical color="#fff" className='text-white'/> </Text>
        <ChevronDown color="#fff" size={18} style={{marginTop:6}}/> <View className='bg-red-500 rounded-full p-1 mt-3'/>
        </View>
        <TouchableOpacity
        onPress={() => router.push('/screens/configuration')}
        
        >
                <Menu size={32}  color="#777676"/>
        
      </TouchableOpacity>
      </View>
        {/* Header com Avatar e Story */}
        <View className="items-center pt-0 pb-6">
          {/* Avatar com Story Border */}
          <TouchableOpacity 
            onPress={() => setIsStoryModalVisible(true)}
            className="mb-4"
            activeOpacity={0.7}
          >
            {hasStory ? (
              // Com Story - Borda Verde Degradê (estilo Instagram com cores da Strivo)
              <LinearGradient
colors={['#16a34a', '#4ade80', '#d3ef86', '#16a32d']}
locations={[0, 0.3, 0.7, 1]}  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{
    padding: 4,
    borderRadius: 9999, // deixa o gradiente circular
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  }}
>
  <View
    style={{
      backgroundColor: 'black',
      borderRadius: 9999,
      padding: 4,
    }}
  >
    <Image
      source={{ uri: profileData.avatar }}
      style={{
        width: 128,
        height: 128,
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: 'black',
      }}
    />
  </View>
</LinearGradient>

            ) : (
              // Sem Story - Botão de adicionar
              <View className="relative">
                <Image
                  source={{ uri: profileData.avatar }}
                  className="w-32 h-32 rounded-full"
                />
                <View className="absolute bottom-0 right-0 bg-[#00FF40] rounded-full p-2 border-4 border-black">
                  <Plus size={20} color="white" />
                </View>
              </View>
            )}
          </TouchableOpacity>

          <Text className="text-[#ffffff] text-3xl font-bold mb-1">
            {profileData.name}
          </Text>
          <Text className="text-gray-400 text-base">
            {profileData.username}
          </Text>
        </View>


        {/* Stats */}
        <View className="flex-row justify-around px-6 mb-6">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {profileData.followers}
            </Text>
            <Text className="text-gray-400 text-sm">Seguidores</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {profileData.following}
            </Text>
            <Text className="text-gray-400 text-sm">Seguindo</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {profileData.posts}
            </Text>
            <Text className="text-gray-400 text-sm">Posts</Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <View className="flex-row justify-center gap-4 px-6 mb-2">
          <TouchableOpacity
            onPress={() => setIsEditModalVisible(true)}
            className="flex-1 border-2  bg-[#25292e] rounded-xl py-3"
          >
            <Text className="text-[#00FF40] text-center font-semibold text-base">
              Editar Perfil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-1 border-2 bg-[#25292e]  rounded-xl py-3">
            <Text className="text-[#00FF40] text-center font-semibold text-base">
              Compartilhar Perfil
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Tabs */}
        <View className="flex-row border-b border-gray-800">
          <TouchableOpacity
            onPress={() => setActiveTab('posts')}
            className={`flex-1 flex-row py-4 items-center justify-center ${
              activeTab === 'posts' ? 'border-b-2 border-[#00FF40]' : ''
            }`}
          >
          

            <Grid3X3 size={32} color={activeTab === 'posts' ? '#22c55e' : '#9ca3af'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('klips')}
            className={`flex-1 py-4 flex-1 flex-row py-4 items-center justify-center ${
              activeTab === 'klips' ? 'border-b-2 border-[#00FF40]' : ''
            }`}
          >
           
             <Clapperboard size={32} color={activeTab === 'klips' ? '#22c55e' : '#9ca3af'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('republicados')}
            className={`flex-1 py-4 flex-1 flex-row py-4 items-center justify-center ${
              activeTab === 'republicados' ? 'border-b-2 border-[#00FF40]' : ''
            }`}
          >
           
            <Repeat2 size={32} color={activeTab === 'republicados' ? '#22c55e' : '#9ca3af'} />

          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View className="p-6">
          <Text className="text-white text-2xl font-bold mb-4">{activeTab.toLocaleUpperCase()}</Text>
          <Text className="text-gray-400 text-center py-12">
            Nenhum conteúdo disponível
          </Text>
        </View>
      </ScrollView>

      {/* Modal de Edição */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 bg-black">
        <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
      enableOnAndroid={true}
    >
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false} >
            {/* Header do Modal */}
            <View className="items-center pt-8 pb-6 mt-6">
              <Text className="text-white text-2xl font-bold mb-6">
                Editar Perfil
              </Text>
              <Image
                source={{ uri: editForm.avatar }}
                className="w-32 h-32 rounded-full mb-4"
              />
              <Text className="text-[#00FF40] text-2xl font-bold">
                {editForm.username}
              </Text>
              <Text className="text-gray-400 text-base">
                {editForm.name}
              </Text>
            </View>

            {/* Formulário */}
            
            <View className="px-6">
              {/* Site */}
              <View className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Nome</Text>
                <TextInput
                  value={editForm.name}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, website: text })
                  }
                  className="bg-gray-900 text-white rounded-lg px-4 py-3 "
                  placeholderTextColor="#666"
                />
              </View>

              <View className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Nome de usuário</Text>
                <TextInput
                  value={editForm.username}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, website: text })
                  }
                  className="bg-gray-900 text-white rounded-lg px-4 py-3 "
                  placeholderTextColor="#666"
                />
              </View>

            <View className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Biografia</Text>
                <TextInput
                  value={editForm.bio}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, bio: text })
                  }
                  className="bg-gray-900 text-white rounded-lg px-4 py-3 "
                  placeholderTextColor="#666"
                  multiline
                />
              </View>

              <View className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Link</Text>
                <TextInput
                  value={editForm.website}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, website: text })
                  }
                  className="bg-gray-900 text-white rounded-lg px-4 py-3 "
                  placeholderTextColor="#666"
                />
              </View>

              <TouchableOpacity className="mb-6 border-t border-gray-700">
                <Text className="text-gray-400 text-sm mb-2 mt-4 text-[#00FF40]">Mostrar selo de verificado no seu perfil</Text>
              </TouchableOpacity>
              

              {/* Botão Salvar */}
              <TouchableOpacity
                onPress={handleSave}
                className="bg-[#00FF40] rounded-lg py-4 mb-4"
              >
                <Text className="text-white text-center font-semibold text-base">
                  Salvar
                </Text>
              </TouchableOpacity>

              {/* Botão Cancelar */}
              <TouchableOpacity
                onPress={() => {
                  setEditForm(profileData);
                  setIsEditModalVisible(false);
                }}
                className="mb-8"
              >
                <Text className="text-gray-400 text-center text-base">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          
          </ScrollView>
            </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/* Modal do Story */}
      <Modal
        visible={isStoryModalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setIsStoryModalVisible(false)}
      >
        <View className="flex-1 bg-black">
          {/* Progress Bar Animada */}
          <View className="absolute top-12 left-4 right-4 z-10">
            <View className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <Animated.View 
                className="h-full bg-white rounded-full"
                style={{ width: progressWidth }}
              />
            </View>
          </View>

          {/* Header */}
          <View className="absolute top-16 left-4 right-4 z-10 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <LinearGradient
colors={['#16a34a', '#4ade80', '#d3ef86', '#16a32d']}
locations={[0, 0.3, 0.7, 1]}  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{
    padding: 2,
    borderRadius: 9999, // deixa o gradiente circular
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  }}
>
                <View className="rounded-full p-0.5 bg-black">
                  <Image
                    source={{ uri: profileData.avatar }}
                    className="w-10 h-10 rounded-full"
                  />
                </View>
              </LinearGradient>
              <View className="ml-3">
                <Text className="text-white font-semibold">{profileData.username}</Text>
                <Text className="text-gray-400 text-xs">2h atrás</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => setIsStoryModalVisible(false)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 20,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text className="text-white text-xl">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Story Content */}
          <View className="flex-1 justify-center items-center">
            <Image
              source={{ uri: profileData.avatar }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Tap to Close */}
          <TouchableOpacity 
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => setIsStoryModalVisible(false)}
          />
        </View>
      </Modal>
      <ShareProfile profileUrl='https://teste.com' visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;