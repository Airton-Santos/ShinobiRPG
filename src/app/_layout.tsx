import { Stack } from 'expo-router'

export default function MainLayout(){
    return(
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }}/>

            <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/characterSelection/page" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/createCharacter/page" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/createCharacter/clanSelection" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/villages/kirigakure" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/villages/konoha" options={{ headerShown: false }}/>
            
            <Stack.Screen name="(panel)/villages/kumogakure" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/villages/sunagakure" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/villages/iwagakure" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/treinamento/page" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/missoes/page" options={{ headerShown: false }}/>

            <Stack.Screen name="(panel)/characterProfile/page" options={{ headerShown: false }}/>
            
        </Stack>
    )
}