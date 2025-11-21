import { useRouter } from 'expo-router';
import { Archive, ArrowLeft, AtSign, Ban, Briefcase, CheckCircle, ChevronRight, Database, Download, Expand, Eye, FileQuestion, Image, MessageCircle, MessageSquare, Monitor, Palette, Share2, Users, Zap } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, badge, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center justify-between px-4 py-3.5 active:bg-zinc-900"
  >
    <View className="flex-row items-center flex-1">
      <View className="mr-3">
        {icon}
      </View>
      <Text className="text-white text-base flex-1">{title}</Text>
    </View>
    <View className="flex-row items-center">
      {badge && (
        <Text className="text-zinc-400 text-sm mr-2">{badge}</Text>
      )}
      <ChevronRight size={20} color="#71717a" />
    </View>
  </TouchableOpacity>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View className="mt-6">
    <Text className="text-zinc-400 text-sm font-semibold px-4 mb-2">{title}</Text>
    <View className="bg-zinc-950">
      {children}
    </View>
  </View>
);

export default function Configuration() {
    const router = useRouter();
   
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-black border-b border-zinc-900">
        <TouchableOpacity className="mr-4" onPress={() => router.push('/screens/profile')}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Configurações e atividade</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Suas Atividades */}
        <Section title="Suas Atividades">
          <MenuItem 
            icon={<Image size={24} color="#fff" />}
            title="Conteúdo Curtido"
          />
          <MenuItem 
            icon={<Archive size={24} color="#fff" />}
            title="Itens Arquivados"
          />
          <MenuItem 
            icon={<Share2 size={24} color="#fff" />}
            title="Republicados"
          />
        </Section>

        {/* Seu conteúdo */}
        <Section title="Seu conteúdo">
          <MenuItem 
            icon={<Eye size={24} color="#fff" />}
            title="Visibilidade do Perfil"
            onPress={() => router.push('/screens/account-privacy')}
          />
          <MenuItem 
            icon={<Users size={24} color="#fff" />}
            title="Melhores Amigos"
          />
          <MenuItem 
            icon={<Ban size={24} color="#fff" />}
            title="Lista de Bloqueio"
          />
          <MenuItem 
            icon={<Monitor size={24} color="#fff" />}
            title="Gerenciar Visualizações"
          />
        </Section>

        {/* Quem pode interagir com você */}
        <Section title="Quem pode interagir com você">
          <MenuItem 
            icon={<MessageCircle size={24} color="#fff" />}
            title="Respostas ao Story"
          />
          <MenuItem 
            icon={<AtSign size={24} color="#fff" />}
            title="Menções diretas"
          />
          <MenuItem 
            icon={<MessageSquare size={24} color="#fff" />}
            title="Comentários"
          />
          <MenuItem 
            icon={<Share2 size={24} color="#fff" />}
            title="Compartilhamento"
          />
        </Section>

        {/* Como você navega */}
        <Section title="Como você navega">
          <MenuItem 
            icon={<Download size={24} color="#fff" />}
            title="Guardar e Baixar"
          />
          <MenuItem 
            icon={<Palette size={24} color="#fff" />}
            title="Tema e Introduções"
          />
          <MenuItem 
            icon={<Database size={24} color="#fff" />}
            title="Ajustes de dados e mídia"
          />
          <MenuItem 
            icon={<Zap size={24} color="#fff" />}
            title="Experiências Antecipadas"
          />
        </Section>

        {/* Suas métricas e ferramentas */}
        <Section title="Suas métricas e ferramentas">
          <MenuItem 
            icon={<CheckCircle size={24} color="#fff" />}
            title="Exibir selo de verificação no Perfil"
          />
          <MenuItem 
            icon={<Briefcase size={24} color="#fff" />}
            title="Categoria e opções da Conta"
          />
        </Section>

        <Section title="Atualizações da Strivo">
          <MenuItem 
            icon={<FileQuestion size={24} color="#fff" />}
            title="Enviar sugestões para a Strivo"
          />
          <MenuItem 
            icon={<Expand size={24} color="#fff" />}
            title="Experiência antecipada da Strivo"
          />
        </Section>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}