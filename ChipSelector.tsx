import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import {
	FlatList,
	ListRenderItem,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
	ScrollViewProps,
	FlatListProps,
	CellRendererProps,
	Dimensions,
} from "react-native";
import {colors} from './constants';
import CrossIcon from './CrossIcon'
import Animated, { FadeIn, FadeInLeft, FadeOut, LinearTransition } from "react-native-reanimated";
import IChip from "./Chip";

export interface Data {
	name: string | null;
	id: number;
}

interface IChipSelectorProps {
	data?: Data[] | null;
	contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
	style?: StyleProp<ViewStyle>;
	selectedIds?: number[] | null;
	onSelect?: (id: number) => void;
	onReset?: () => void;
	animationKey?: string;
}

const styles = StyleSheet.create({
		crossIcon: {
			backgroundColor: colors.background,
			justifyContent: "center",
			alignItems: "center",
			height: 32,
			width: 32,
			borderRadius: 16,
			marginEnd: 8,
		},
	});

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<Data>>(FlatList);

const EnteringAnimation = () => FadeIn.springify().damping(14).mass(1.1);

type Ref = FlatList<Data>;

const IChipSelector = forwardRef<Ref, IChipSelectorProps>(
	({ data, contentContainerStyle, style, onReset, selectedIds, onSelect }, ref) => {
		const [rendered, setRendered] = React.useState(false);
		const newData = useMemo(
			() =>
				data && selectedIds && selectedIds.at(0) !== -1
					? data.filter(item => selectedIds?.includes(item.id))
					: data,
			[data, selectedIds],
		);
		const selectedChip = data?.find(item => selectedIds?.includes(item.id));

		const handleChange = (fn?: () => void) => () => {
			if (fn) {
				setRendered(true);
				fn();
			}
		};

		const renderChip: ListRenderItem<Data> = ({ item, index }) => {
			const isSelected = selectedIds ? selectedIds.includes(item.id) : false;
			return (
				<Animated.View key={String(rendered) + String(index)} style={{ width: !isSelected ? undefined : undefined }}>
					<IChip onPress={handleChange(onSelect?.bind("", item.id))} title={item.name || ""} isSelected={isSelected} />
				</Animated.View>
			);
		};

		const renderHeader = useCallback(() => {
			if (!selectedChip) return null;

			return (
				<AnimatedTouchable
					onPress={handleChange(onReset)}
					entering={FadeInLeft.springify().mass(1).damping(20).stiffness(120)}
					style={styles.crossIcon}>
					<CrossIcon />
				</AnimatedTouchable>
			);
		}, [selectedChip]);

		const renderCell = React.useCallback(
			(props: CellRendererProps<Data>) => {
				return (
						<Animated.View
							{...props}
							key={props.cellKey}
							entering={EnteringAnimation().delay(props.index * 100)}
							exiting={FadeOut.duration(300)}
							layout={LinearTransition.springify().mass(1).damping(20).stiffness(120)}
						/>
				);
			},
			[],
		);

		return (
			<View style={[{ height: 32 }, style]}>
				<AnimatedFlatList
					//@ts-ignore
					ref={ref}
					horizontal
					ListHeaderComponent={renderHeader}
					keyExtractor={item => item.id.toString()}
					data={newData}
					CellRendererComponent={renderCell}
					showsHorizontalScrollIndicator={false}
					renderItem={renderChip}
					style={{ width: "100%" }}
					contentContainerStyle={[
						contentContainerStyle,
						{
							minWidth: SCREEN_WIDTH,
						},
					]}
				/>
			</View>
		);
	},
);

export default IChipSelector;
